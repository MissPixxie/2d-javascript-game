import { kaBoom } from "../kaboomCtx";

export function drawBoundaries(map, layers) {
  for (const boundary of layers.objects) {
    map.add(
      generateColliders(
        boundary.width,
        boundary.height,
        kaBoom.vec2(boundary.x, boundary.y),
        boundary.name
      )
    );
  }
}

export function generateColliders(width, height, pos, tag, map, layers) {
  return [
    kaBoom.area({ shape: new kaBoom.Rect(kaBoom.vec2(0), width, height) }),
    kaBoom.pos(pos),
    kaBoom.body({ isStatic: true }),
    kaBoom.offscreen(),
    tag,
  ];
}
