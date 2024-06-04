import { scaleFactor, background } from "../constants";
import { kaBoom } from "../kaboomCtx";
import { setCamScale } from "../utils";
import ChangeScene from "./world";
import createPlayer, { setPlayerMovement } from "../entities/player.js";
import createAhri from "../entities/ahri.js";
import createEkko from "../entities/ekko.js";
import { drawBoundaries, generateColliders } from "../utils/boundaries.js";
//import interactions from "../utils/interactions.js";
import {
  displayAhriDialogue,
  displayChifferDialogue,
  displayDialogue,
} from "../utils/dialogueLogic.js";
import { dialogueData } from "../utils/dialogueData.js";
import {
  getPreviousScene,
  previousScene,
  setPreviousScene,
} from "../stateManager/globalStateManager.js";

export default function apartmentScene() {
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

  kaBoom.scene("apartmentScene", async () => {
    const mapData = await (await fetch("../map2.json")).json();

    const map = kaBoom.add([
      kaBoom.sprite("map"),
      kaBoom.pos(0),
      kaBoom.scale(scaleFactor),
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

    let player = null;
    let ahri = null;
    let ekko = null;
    const layers = mapData.layers;

    // BOUNDARIES //
    for (const layer of layers) {
      if (layer.name === "boundaries") {
        drawBoundaries(map, layer, player);
        continue;
      }
      if (layer.name === "spawnpoint") {
        for (const entity of layer.objects) {
          // if (
          //   entity.name === "playerPuzzle" &&
          //   previousScene === "puzzleScene"
          // ) {
          //   player = kaBoom.add(
          //     createPlayer(
          //       kaBoom.vec2(
          //         (map.pos.x + entity.x) * scaleFactor,
          //         (map.pos.y + entity.y) * scaleFactor
          //       )
          //     )
          //   );
          //   continue;
          // }
          if (entity.name === "player") {
            player = kaBoom.add(
              createPlayer(
                kaBoom.vec2(
                  (map.pos.x + entity.x) * scaleFactor,
                  (map.pos.y + entity.y) * scaleFactor
                )
              )
            );
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
            ekko = kaBoom.add(
              createEkko(
                kaBoom.vec2(
                  (map.pos.x + entity.x) * scaleFactor,
                  (map.pos.y + entity.y) * scaleFactor
                )
              )
            );
            continue;
          }
          if (entity.name === "ahri") {
            ahri = kaBoom.add(
              createAhri(
                kaBoom.vec2(
                  (map.pos.x + entity.x) * scaleFactor,
                  (map.pos.y + entity.y) * scaleFactor
                )
              )
            );
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

    setPlayerMovement(player);
    //setInteraction(player, layers);

    player.onCollide("ahri", () => {
      player.isInDialogue = true;
      if (ahri.curAnim() != "awake") {
        ahri.play("awake");
        ahri.status = "awake";
      }
      displayAhriDialogue(dialogueData["ahri"], () => {
        player.isInDialogue = false;
        ahri.play("idle");
        ahri.status = "idle";
      });
    });

    player.onCollide("ekko", () => {
      player.isInDialogue = true;
      displayDialogue(dialogueData["ekko"], () => {
        player.isInDialogue = false;
      });
    });

    player.onCollide("chiffer", () => {
      player.isInDialogue = true;
      displayChifferDialogue(dialogueData["chiffer"], () => {
        player.isInDialogue = false;
      });
    });

    player.onCollide("computer", () => {
      player.isInDialogue = true;
      displayDialogue(dialogueData["computer"], () => {
        player.isInDialogue = false;
      });
    });

    player.onCollide("tv", () => {
      player.isInDialogue = true;
      displayDialogue(dialogueData["tv"], () => {
        player.isInDialogue = false;
      });
    });

    player.onCollide("puzzle", () => {
      ChangeScene("puzzleScene");
    });
  });

  kaBoom.go("apartmentScene");
}
