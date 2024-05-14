import { dialogueData, scaleFactor, background } from "../constants";
import { kaBoom } from "../kaboomCtx";
import { displayDialogue, setCamScale } from "../utils";

export default function Puzzle() {
  kaBoom.loadSprite("spritesheet", "../spritesheet.png", {
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

  kaBoom.loadSprite("map", "../map2.png");

  kaBoom.setBackground(kaBoom.Color.fromHex(background));

  kaBoom.scene("puzzle", async () => {
    const mapData = await (await fetch("../map2.json")).json();
    const layers = mapData.layers;

    const map = kaBoom.add([
      kaBoom.sprite("map"),
      kaBoom.pos(0),
      kaBoom.scale(scaleFactor),
    ]);

    // PLAYER //
    const player = kaBoom.make([
      kaBoom.sprite("spritesheet", { anim: "idle-down" }),
      kaBoom.health(10),
      kaBoom.area(),
      kaBoom.pos(),
      kaBoom.body(),
      kaBoom.anchor("center"),
      kaBoom.scale(scaleFactor),
      {
        speed: 250,
        direction: "down",
        isInDialogue: false,
      },
      "player",
    ]);

    const bunny = kaBoom.make([
      kaBoom.sprite("spritesheet", { anim: "bunnymove" }),
      kaBoom.area(),
      kaBoom.pos(),
      kaBoom.body({ isStatic: true }),
      kaBoom.anchor("top"),
      kaBoom.scale(3),
      "bunny",
    ]);

    // BOUNDARIES //
    for (const layer of layers) {
      if (layer.name === "boundaries") {
        for (const boundary of layer.objects) {
          map.add([
            kaBoom.area({
              shape: new kaBoom.Rect(
                kaBoom.vec2(0, 0),
                boundary.width,
                boundary.height
              ),
            }),
            kaBoom.pos(boundary.x, boundary.y),
            kaBoom.body({ isStatic: true }),
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
            player.pos = kaBoom.vec2(
              (map.pos.x + entity.x) * scaleFactor,
              (map.pos.y + entity.y) * scaleFactor
            );
            kaBoom.add(player);
            continue;
          }
          if (entity.name === "bunny") {
            bunny.pos = kaBoom.vec2(
              (map.pos.x + entity.x) * scaleFactor,
              (map.pos.y + entity.y) * scaleFactor
            );
            kaBoom.add(bunny);
            continue;
          }
        }
      }
    }

    setCamScale(kaBoom);

    kaBoom.onResize(() => {
      setCamScale(kaBoom);
    });

    kaBoom.onUpdate(() => {
      kaBoom.camPos(player.pos.x, player.pos.y + 100);
    });

    kaBoom.onMouseDown((mouseBtn) => {
      if (mouseBtn !== "left" || player.isInDialogue) return;

      const worldMousePos = kaBoom.toWorld(kaBoom.mousePos());
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

    kaBoom.onMouseRelease(() => {
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

  kaBoom.go("puzzle");
}
