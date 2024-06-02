import { kaBoom } from "../kaboomCtx.js";
import main from "./apartmentScene";
import firstScene from "./firstScene";
import puzzleScene from "./puzzle";

import {
  previousScene,
  setPreviousScene,
  getPreviousScene,
} from "../stateManager/globalStateManager.js";

//export let previousScene = "null";

kaBoom.scene("apartmentScene", main);
kaBoom.scene("firstScene", firstScene);
kaBoom.scene("puzzleScene", puzzleScene);

export default function ChangeScene(nameOfScene) {
  console.log(previousScene);
  kaBoom.go(nameOfScene);
}

ChangeScene("apartmentScene");

// export default async function world(kaBoom) {
//   kaBoom.loadSprite("spritesheet", "../spritesheet.png", {
//     sliceX: 39,
//     sliceY: 31,
//     anims: {
//       "idle-down": 870,
//       "walk-down": { from: 871, to: 872, loop: true, speed: 8 },
//       "idle-side": 873,
//       "walk-side": { from: 874, to: 875, loop: true, speed: 8 },
//       "idle-up": 876,
//       "walk-up": { from: 877, to: 878, loop: true, speed: 8 },
//       balloonmove: { from: 713, to: 712, loop: true, speed: 2 },
//       ekkomove: { from: 792, to: 793, loop: true, speed: 3 },
//     },
//   });

//   kaBoom.loadSprite("ahri", "../ahri.png", {
//     sliceX: 2,
//     sliceY: 2,
//     anims: {
//       idle: { from: 0, to: 1, loop: true, speed: 0.7 },
//       awake: { from: 2, to: 3, loop: true, speed: 1 },
//     },
//   });

//   kaBoom.loadSprite("map", "../map2.png");

//   const mapData = await (await fetch("../map2.json")).json();
//   const layers = mapData.layers;

//   const map = kaBoom.add([
//     kaBoom.sprite("map"),
//     kaBoom.pos(0),
//     kaBoom.scale(scaleFactor),
//   ]);

//   const entities = {
//     player: null,
//   };

//   // BOUNDARIES //
//   for (const layer of layers) {
//     if (layer.name === "boundaries") {
//       for (const boundary of layer.objects) {
//         map.add([
//           kaBoom.area({
//             shape: new kaBoom.Rect(
//               kaBoom.vec2(0, 0),
//               boundary.width,
//               boundary.height
//             ),
//           }),
//           kaBoom.pos(boundary.x, boundary.y),
//           kaBoom.body({ isStatic: true }),
//           boundary.name,
//         ]);

//         if (boundary.type === "hasDialogue") {
//           player.onCollide(boundary.name, () => {
//             player.isInDialogue = true;
//             if (boundary.name === "chiffer") {
//               displayChifferDialogue(dialogueData[boundary.name], () => {
//                 player.isInDialogue = false;
//               });
//             } else if (boundary.name === "puzzle") {
//               console.log(player.pos.x);
//               console.log(player.pos.y);
//               ChangeScene("puzzleScene");
//               //console.log(`${playerXPos}, ${playerYPos}`);
//               // ChangeScene("testScene", {
//               //   position: {
//               //     x: position.x,
//               //     y: position.y,
//               //   },
//               // });
//             } else if (boundary.name === "ahri") {
//               if (ahri.curAnim() != "awake") {
//                 ahri.play("awake");
//                 ahri.status = "awake";
//               }
//               displayAhriDialogue(dialogueData[boundary.name], () => {
//                 player.isInDialogue = false;
//                 ahri.play("idle");
//                 ahri.status = "idle";
//               });
//             } else {
//               displayDialogue(dialogueData[boundary.name], () => {
//                 player.isInDialogue = false;
//               });
//             }
//           });
//         }
//       }
//       continue;
//     }

//     // SPAWNPOINT
//     if (layer.name === "spawnpoint") {
//       for (const entity of layer.objects) {
//         if (entity.name === "player") {
//           entity.x = 1219.7519994755462;
//           entity.y = 732.1440469379618;
//           console.log(entity.x);
//           console.log(entity.y);
//           player.pos = kaBoom.vec2(
//             (map.pos.x + entity.x) * scaleFactor,
//             (map.pos.y + entity.y) * scaleFactor
//           );
//           kaBoom.add(player);
//           continue;
//         }
//         if (entity.name === "balloon") {
//           balloon.pos = kaBoom.vec2(
//             (map.pos.x + entity.x) * scaleFactor,
//             (map.pos.y + entity.y) * scaleFactor
//           );
//           kaBoom.add(balloon);
//           continue;
//         }
//         if (entity.name === "ekko") {
//           ekko.pos = kaBoom.vec2(
//             (map.pos.x + entity.x) * scaleFactor,
//             (map.pos.y + entity.y) * scaleFactor
//           );
//           kaBoom.add(ekko);
//           continue;
//         }
//         if (entity.name === "ahri") {
//           ahri.pos = kaBoom.vec2(
//             (map.pos.x + entity.x) * scaleFactor,
//             (map.pos.y + entity.y) * scaleFactor
//           );
//           kaBoom.add(ahri);
//           continue;
//         }
//       }
//     }
//   }
// }
