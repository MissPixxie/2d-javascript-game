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

export function setPlayerMovement(player) {
  kaBoom.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = kaBoom.toWorld(kaBoom.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    const lowerBound = 50;
    const upperBound = 125;

    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.curAnim() != "walk-up"
    ) {
      player.play("walk-up");
      player.direction = "up";
      return;
    }

    if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.curAnim() != "walk-down"
    ) {
      player.play("walk-down");
      player.direction = "down";
      return;
    }

    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.curAnim() != "walk-side") player.play("walk-side");
      player.direction = "right";
      return;
    }

    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      if (player.curAnim() != "walk-side") player.play("walk-side");
      player.direction = "left";
      return;
    }
  });

  kaBoom.onMouseRelease(() => {
    if (player.direction === "down") {
      player.play("idle-down");
      return;
    }
    if (player.direction === "up") {
      player.play("idle-up");
      return;
    }

    player.play("idle-side");
  });
}
