import { kaBoom } from "../kaboomCtx";

kaBoom.loadSprite("spritesheet", "../spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    ekkomove: { from: 792, to: 793, loop: true, speed: 3 },
  },
});

export default function createEkko(pos) {
  return [
    kaBoom.sprite("spritesheet", { anim: "ekkomove" }),
    kaBoom.area({ shape: new kaBoom.Rect(kaBoom.vec2(3, 4), 10, 12) }),
    kaBoom.pos(pos),
    kaBoom.body({ isStatic: true }),
    kaBoom.anchor("top"),
    kaBoom.scale(3),
    "ekko",
  ];
}
