import { kaBoom } from "./src/kaboomCtx.js";
import world from "./src/scenes/world.js";

const scenes = {
  world,
};

for (const sceneName in scenes) {
  kaBoom.scene(sceneName, () => scenes[sceneName](kaBoom));
}

kaBoom.go("world");
