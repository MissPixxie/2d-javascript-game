import {
  dialogueData,
  scaleFactor,
  scaleFactor2,
  background,
} from "../constants";
import { kaBoom } from "../kaboomCtx";
import {
  displayDialogue,
  displayFirstDialogue,
  displayAhriDialogue,
  displayChifferDialogue,
  setCamScale,
} from "../utils";
import ChangeScene from "../world";

export default function main(puzzleStatus) {
  kaBoom.loadSprite("spritesheet", "../spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
      "idle-down": 870,
      "walk-down": { from: 871, to: 872, loop: true, speed: 8 },
      "idle-side": 873,
      "walk-side": { from: 874, to: 875, loop: true, speed: 8 },
      "idle-up": 876,
      "walk-up": { from: 877, to: 878, loop: true, speed: 8 },
      balloonmove: { from: 713, to: 712, loop: true, speed: 2 },
      ekkomove: { from: 792, to: 793, loop: true, speed: 3 },
    },
  });

  kaBoom.loadSprite("ahri", "../ahri.png", {
    sliceX: 2,
    sliceY: 2,
    anims: {
      idle: { from: 0, to: 1, loop: true, speed: 0.7 },
      awake: { from: 2, to: 3, loop: true, speed: 1 },
    },
  });

  kaBoom.loadSprite("map", "../map2.png");

  kaBoom.setBackground(kaBoom.Color.fromHex(background));

  kaBoom.scene("main", async () => {
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

    const ekko = kaBoom.make([
      kaBoom.sprite("spritesheet", { anim: "ekkomove" }),
      kaBoom.area(),
      kaBoom.pos(),
      kaBoom.body({ isStatic: true }),
      kaBoom.anchor("top"),
      kaBoom.scale(3),
      "ekko",
    ]);

    const ahri = kaBoom.make([
      kaBoom.sprite("ahri", { anim: "idle" }),
      kaBoom.area(),
      kaBoom.pos(),
      kaBoom.body({ isStatic: true }),
      kaBoom.anchor("top"),
      kaBoom.scale(scaleFactor),
      {
        status: "idle",
      },
      "ahri",
    ]);

    const balloon = kaBoom.make([
      kaBoom.sprite("spritesheet", { anim: "balloonmove" }),
      kaBoom.area(),
      kaBoom.pos(),
      kaBoom.body({ isStatic: true }),
      kaBoom.anchor("top"),
      kaBoom.scale(3),
      "balloon",
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
              if (boundary.name === "chiffer") {
                displayChifferDialogue(dialogueData[boundary.name], () => {
                  player.isInDialogue = false;
                });
              } else if (boundary.name === "puzzle") {
                ChangeScene("puzzleScene");
              } else if (boundary.name === "ahri") {
                if (ahri.curAnim() != "awake") {
                  ahri.play("awake");
                  ahri.status = "awake";
                }
                displayAhriDialogue(dialogueData[boundary.name], () => {
                  player.isInDialogue = false;
                  ahri.play("idle");
                  ahri.status = "idle";
                });
              } else {
                displayDialogue(dialogueData[boundary.name], () => {
                  player.isInDialogue = false;
                });
              }
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
          if (entity.name === "balloon") {
            balloon.pos = kaBoom.vec2(
              (map.pos.x + entity.x) * scaleFactor,
              (map.pos.y + entity.y) * scaleFactor
            );
            kaBoom.add(balloon);
            continue;
          }
          if (entity.name === "ekko") {
            ekko.pos = kaBoom.vec2(
              (map.pos.x + entity.x) * scaleFactor,
              (map.pos.y + entity.y) * scaleFactor
            );
            kaBoom.add(ekko);
            continue;
          }
          if (entity.name === "ahri") {
            ahri.pos = kaBoom.vec2(
              (map.pos.x + entity.x) * scaleFactor,
              (map.pos.y + entity.y) * scaleFactor
            );
            kaBoom.add(ahri);
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

  kaBoom.go("main");
}
