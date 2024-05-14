import kaboom from "kaboom";

export const kaBoom = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById("game"),
});
