export function playAnimIfNotPlaying(gameObj, animName) {
  if (gameObj.curAnim() !== animName) gameObj.play(animName);
}

export function colorizeBackground(kaBoom, r, g, b) {
  kaBoom.add([
    kaBoom.rect(kaBoom.width, kaBoom.height),
    kaBoom.color(r, g, b),
    kaBoom.fixed(),
  ]);
}

// CAMERA //
export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
    return;
  }

  k.camScale(k.vec2(1.5));
}
