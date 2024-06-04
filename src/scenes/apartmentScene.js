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
import { dialogueData } from "../utils/dialogueData.js";
import { drawBoundaries } from "../utils/boundaries.js";
import {
  displayAhriDialogue,
  displayChifferDialogue,
  displayDialogue,
} from "../utils/dialogueLogic.js";

import {
  previousScene,
  setPreviousScene,
  getPreviousScene,
} from "../stateManager/globalStateManager.js";
import { colorizeBackground } from "../utils.js";

export default async function apartmentScene(kaBoom) {
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
      drawBoundaries(kaBoom, map, layer);
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

  entities.player.onCollide("ahri", () => {
    entities.player.isInDialogue = true;
    if (entities.ahri.curAnim() != "awake") {
      entities.ahri.play("awake");
      entities.ahri.status = "awake";
    }
    displayAhriDialogue(dialogueData["ahri"], () => {
      entities.player.isInDialogue = false;
      entities.ahri.play("idle");
      entities.ahri.status = "idle";
    });
  });

  entities.player.onCollide("ekko", () => {
    entities.player.isInDialogue = true;
    displayDialogue(dialogueData["ekko"], () => {
      entities.player.isInDialogue = false;
    });
  });

  entities.player.onCollide("chiffer", () => {
    entities.player.isInDialogue = true;
    displayChifferDialogue(dialogueData["chiffer"], () => {
      entities.player.isInDialogue = false;
    });
  });

  entities.player.onCollide("computer", () => {
    entities.player.isInDialogue = true;
    displayDialogue(dialogueData["computer"], () => {
      entities.player.isInDialogue = false;
    });
  });

  entities.player.onCollide("tv", () => {
    entities.player.isInDialogue = true;
    displayDialogue(dialogueData["tv"], () => {
      entities.player.isInDialogue = false;
    });
  });

  entities.player.onCollide("puzzle", () => {
    kaBoom.go("puzzleScene");
  });

  setPlayerMovement(kaBoom, entities.player);

  setCamScale(kaBoom);

  kaBoom.onResize(() => {
    setCamScale(kaBoom);
  });
}
