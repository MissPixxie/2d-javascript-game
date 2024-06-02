import { scaleFactor } from "../constants";
import { kaBoom } from "../kaboomCtx";

kaBoom.loadSprite("ahri", "../ahri.png", {
  sliceX: 2,
  sliceY: 2,
  anims: {
    idle: { from: 0, to: 1, loop: true, speed: 0.7 },
    awake: { from: 2, to: 3, loop: true, speed: 1 },
  },
});

export default function createAhri(pos) {
  return [
    kaBoom.sprite("ahri", { anim: "idle" }),
    kaBoom.area({ shape: new kaBoom.Rect(kaBoom.vec2(3, 4), 10, 12) }),
    kaBoom.pos(pos),
    kaBoom.body({ isStatic: true }),
    kaBoom.anchor("top"),
    kaBoom.scale(scaleFactor),
    {
      status: "idle",
    },
    "ahri",
  ];
}
