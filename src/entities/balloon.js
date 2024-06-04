export default function createBalloon(kaBoom, pos) {
  return [
    kaBoom.sprite("spritesheet", { anim: "balloonmove" }),
    kaBoom.area(),
    kaBoom.pos(pos),
    kaBoom.body({ isStatic: true }),
    kaBoom.anchor("top"),
    "balloon",
  ];
}
