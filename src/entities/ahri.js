import { scaleFactor } from "../constants";

export default function createAhri(kaBoom, pos) {
  return [
    kaBoom.sprite("ahri", { anim: "idle" }),
    kaBoom.area({ shape: new kaBoom.Rect(kaBoom.vec2(3, 4), 10, 12) }),
    kaBoom.pos(pos),
    kaBoom.body({ isStatic: true }),
    kaBoom.anchor("top"),
    {
      status: "idle",
    },
    "ahri",
  ];
}
