import { kaBoom } from "../kaboomCtx.js";
import apartmentScene from "./apartmentScene";
import firstScene from "./firstScene";
import puzzleScene from "./puzzle";
import { background } from "../constants.js";
import { setCamScale } from "../utils.js";
import { scaleFactor } from "../constants.js";
import createPlayer from "../entities/player.js";
import createAhri from "../entities/ahri.js";
import createEkko from "../entities/ekko.js";
import createBalloon from "../entities/balloon.js";
import { setPlayerMovement } from "../entities/player.js";

import {
  previousScene,
  setPreviousScene,
  getPreviousScene,
} from "../stateManager/globalStateManager.js";
import { colorizeBackground } from "../utils.js";

kaBoom.scene("apartmentScene", apartmentScene);
kaBoom.scene("firstScene", firstScene);
kaBoom.scene("puzzleScene", puzzleScene);

export function ChangeScene(nameOfScene) {
  kaBoom.go(nameOfScene);
}

ChangeScene("apartmentScene");

export default async function world(kaBoom) {
  colorizeBackground(kaBoom, 76, 170, 255);

  kaBoom.loadSprite("map", "../map2.png");

  const mapData = await (await fetch("../map2.json")).json();

  const map = kaBoom.add([
    kaBoom.sprite("map"),
    kaBoom.pos(0),
    kaBoom.scale(scaleFactor),
  ]);

  const entities = {
    player: null,
    ahri: null,
    ekko: null,
    balloon: null,
  };

  const layers = mapData.layers;

  // BOUNDARIES //
  for (const layer of layers) {
    if (layer.name === "boundaries") {
      //drawBoundaries(map, layer, player);
      continue;
    }
    if (layer.name === "spawnpoint") {
      for (const entity of layer.objects) {
        if (entity.name === "playerPuzzle" && previousScene === "puzzleScene") {
          entities.player = map.add(
            createPlayer(kaBoom, kaBoom.vec2(entity.x, entity.y))
          );
          continue;
        }
        if (entity.name === "player") {
          entities.player = map.add(
            createPlayer(kaBoom, kaBoom.vec2(entity.x, entity.y))
          );
          continue;
        }
        if (entity.name === "balloon") {
          entities.balloon = map.add(
            createBalloon(kaBoom, kaBoom.vec2(entity.x, entity.y))
          );
          continue;
        }
        if (entity.name === "ekko") {
          entities.ekko = map.add(
            createEkko(kaBoom, kaBoom.vec2(entity.x, entity.y))
          );
          continue;
        }
        if (entity.name === "ahri") {
          entities.ahri = map.add(
            createAhri(kaBoom, kaBoom.vec2(entity.x, entity.y))
          );
          continue;
        }
      }
    }
  }
  kaBoom.camScale(1.5);
  kaBoom.camPos(entities.player.worldPos());
  kaBoom.onUpdate(async () => {
    if (entities.player.pos.dist(kaBoom.camPos())) {
    }
    await kaBoom.tween(
      kaBoom.camPos(),
      entities.player.worldPos(),
      0.15,
      (newPos) => {
        kaBoom.camPos(newPos);
      },
      kaBoom.easings.linear
    );
  });

  setPlayerMovement(kaBoom, entities.player);
}

setCamScale(kaBoom);

kaBoom.onResize(() => {
  setCamScale(kaBoom);
});

// setInteraction(player, layers);

// player.onCollide("ahri", () => {
//   player.isInDialogue = true;
//   if (ahri.curAnim() != "awake") {
//     ahri.play("awake");
//     ahri.status = "awake";
//   }
//   displayAhriDialogue(dialogueData["ahri"], () => {
//     player.isInDialogue = false;
//     ahri.play("idle");
//     ahri.status = "idle";
//   });
// });

// player.onCollide("ekko", () => {
//   player.isInDialogue = true;
//   displayDialogue(dialogueData["ekko"], () => {
//     player.isInDialogue = false;
//   });
// });

// player.onCollide("chiffer", () => {
//   player.isInDialogue = true;
//   displayChifferDialogue(dialogueData["chiffer"], () => {
//     player.isInDialogue = false;
//   });
// });

// player.onCollide("computer", () => {
//   player.isInDialogue = true;
//   displayDialogue(dialogueData["computer"], () => {
//     player.isInDialogue = false;
//   });
// });

// player.onCollide("tv", () => {
//   player.isInDialogue = true;
//   displayDialogue(dialogueData["tv"], () => {
//     player.isInDialogue = false;
//   });
// });

// player.onCollide("puzzle", () => {
//   ChangeScene("puzzleScene");
// });
