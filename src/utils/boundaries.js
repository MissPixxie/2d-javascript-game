export function generateColliders(kaBoom, width, height, pos, tag) {
  return [
    kaBoom.area({ shape: new kaBoom.Rect(kaBoom.vec2(0), width, height) }),
    kaBoom.pos(pos),
    kaBoom.body({ isStatic: true }),
    kaBoom.offscreen(),
    tag,
  ];
}

export function drawBoundaries(kaBoom, map, layers) {
  for (const boundary of layers.objects) {
    map.add(
      generateColliders(
        kaBoom,
        boundary.width,
        boundary.height,
        kaBoom.vec2(boundary.x, boundary.y),
        boundary.name
      )
    );
  }
}
