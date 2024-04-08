import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 956,
    "walk-down": { from: 959, to: 957, loop: true, speed: 8 },
    "idle-side": 995,
    "walk-side": { from: 996, to: 998, loop: true, speed: 8 },
    "idle-up": 1034,
    "walk-up": { from: 1035, to: 1037, loop: true, speed: 8 },
    bunnymove: { from: 780, to: 781, loop: true, speed: 2 },
    "full-health": 546,
  },
});

k.loadSprite("map", "./map.png");

k.setBackground(k.Color.fromHex("#966147"));

k.scene("main", async () => {
  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  // PLAYER //
  const player = k.make([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.health(10),
    k.area(),
    k.pos(),
    k.body(),
    k.anchor("center"),
    k.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]);

  player.onCollide("water", () => {
    player.hurt(1);
  });

  player.onHurt(() => {
    player.setHP();
  });

  const bunny = k.make([
    k.sprite("spritesheet", { anim: "bunnymove" }),
    k.area(),
    k.pos(),
    k.body({ isStatic: true }),
    k.anchor("top"),
    k.scale(3),
    "bunny",
  ]);

  // BOUNDARIES //
  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height),
          }),
          k.pos(boundary.x, boundary.y),
          k.body({ isStatic: true }),
          boundary.name,
        ]);

        if (boundary.type === "hasDialogue") {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            displayDialogue(
              dialogueData[boundary.name],
              () => (player.isInDialogue = false)
            );
          });
        }
      }
      continue;
    }

    if (layer.name === "spawnpoint") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
        if (entity.name === "bunny") {
          bunny.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(bunny);
          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    const lowerBound = 50;
    const upperBound = 125;

    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.curAnim() != "walk-up"
    ) {
      player.play("walk-up");
      player.direction = "up";
      return;
    }

    if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.curAnim() != "walk-down"
    ) {
      player.play("walk-down");
      player.direction = "down";
      return;
    }

    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.curAnim() != "walk-side") player.play("walk-side");
      player.direction = "right";
      return;
    }

    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      if (player.curAnim() != "walk-side") player.play("walk-side");
      player.direction = "left";
      return;
    }
  });

  k.onMouseRelease(() => {
    if (player.direction === "down") {
      player.play("idle-down");
      return;
    }
    if (player.direction === "up") {
      player.play("idle-up");
      return;
    }

    player.play("idle-side");
  });
});

k.go("main");
