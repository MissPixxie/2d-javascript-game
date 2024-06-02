import { dialogueData, scaleFactor } from "../constants";
import { kaBoom } from "../kaboomCtx";
import { displayDialogue, setCamScale } from "../utils";

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
  },
});

export default function createPlayer(pos) {
  return [
    kaBoom.sprite("spritesheet", { anim: "idle-down" }),
    kaBoom.area({ shape: new kaBoom.Rect(kaBoom.vec2(3, 4), 10, 12) }),
    kaBoom.body(),
    kaBoom.pos(pos),
    kaBoom.anchor("center"),
    kaBoom.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ];
}
