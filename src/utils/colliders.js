import { kaBoom } from "../kaboomCtx";

export function generateColliders(width, height, pos, tag, map, layers) {
  return [
    kaBoom.area({ shape: new kaBoom.Rect(kaBoom.vec2(0), width, height) }),
    kaBoom.pos(pos),
    kaBoom.body({ isStatic: true }),
    kaBoom.offscreen(),
    tag,
  ];
}
