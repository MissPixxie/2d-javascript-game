import { gameState } from "../stateManager/stateManager";
import { playAnimIfNotPlaying, keysPressed } from "../utils";

export default function createPlayer(kaBoom, pos) {
  return [
    kaBoom.sprite("spritesheet", { anim: "idle-down" }),
    kaBoom.area({ shape: new kaBoom.Rect(kaBoom.vec2(3, 4), 1, 12) }),
    kaBoom.body(),
    kaBoom.pos(pos),
    kaBoom.anchor("center"),
    {
      speed: 70,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ];
}

export function setPlayerMovement(kaBoom, player) {
  kaBoom.onKeyDown((key) => {
    if (gameState.getFreezePlayer()) return;
    if (["left"].includes(key) && !keysPressed(kaBoom, ["up", "down"])) {
      player.flipX = true;
      playAnimIfNotPlaying(player, "walk-side");
      player.move(-player.speed, 0);
      player.direction = "left";
      return;
    }
    if (["right"].includes(key) && !keysPressed(kaBoom, ["up", "down"])) {
      player.flipX = false;
      playAnimIfNotPlaying(player, "walk-side");
      player.move(player.speed, 0);
      player.direction = "right";
      return;
    }
    if (["up"].includes(key)) {
      playAnimIfNotPlaying(player, "walk-up");
      player.move(0, -player.speed);
      player.direction = "up";
      return;
    }
    if (["down"].includes(key)) {
      playAnimIfNotPlaying(player, "walk-down");
      player.move(0, player.speed);
      player.direction = "down";
      return;
    }
  });

  kaBoom.onKeyRelease(() => {
    player.stop();
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

  // kaBoom.onMouseDown((mouseBtn) => {
  //   if (mouseBtn !== "left" || player.isInDialogue) return;

  //   const worldMousePos = kaBoom.toWorld(kaBoom.mousePos());
  //   player.moveTo(worldMousePos, player.speed);

  //   const mouseAngle = player.pos.angle(worldMousePos);

  //   const lowerBound = 50;
  //   const upperBound = 125;

  //   if (
  //     mouseAngle > lowerBound &&
  //     mouseAngle < upperBound &&
  //     player.curAnim() != "walk-up"
  //   ) {
  //     player.play("walk-up");
  //     player.direction = "up";
  //     return;
  //   }npm run

  //   if (
  //     mouseAngle < -lowerBound &&
  //     mouseAngle > -upperBound &&
  //     player.curAnim() != "walk-down"
  //   ) {
  //     player.play("walk-down");
  //     player.direction = "down";
  //     return;
  //   }

  //   if (Math.abs(mouseAngle) > upperBound) {
  //     player.flipX = false;
  //     if (player.curAnim() != "walk-side") player.play("walk-side");
  //     player.direction = "right";
  //     return;
  //   }

  //   if (Math.abs(mouseAngle) < lowerBound) {
  //     player.flipX = true;
  //     if (player.curAnim() != "walk-side") player.play("walk-side");
  //     player.direction = "left";
  //     return;
  //   }
  // });

  // kaBoom.onMouseRelease(() => {
  //   if (player.direction === "down") {
  //     player.play("idle-down");
  //     return;
  //   }
  //   if (player.direction === "up") {
  //     player.play("idle-up");
  //     return;
  //   }

  //   player.play("idle-side");
  // });
}
