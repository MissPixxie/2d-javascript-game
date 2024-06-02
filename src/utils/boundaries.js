import { kaBoom } from "../kaboomCtx";
import { generateColliders } from "./colliders";

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
