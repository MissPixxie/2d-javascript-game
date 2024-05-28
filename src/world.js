import kaboom from "kaboom";
import { dialogueData, scaleFactor } from "./constants";
import { kaBoom } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";
import main from "./scenes/main";
import firstScene from "./scenes/firstScene";
import puzzleScene from "./scenes/puzzle";

kaBoom.scene("main", main);
kaBoom.scene("firstScene", firstScene);
kaBoom.scene("puzzleScene", puzzleScene);

export default function ChangeScene(nameOfScene) {
  kaBoom.go(nameOfScene);
}
ChangeScene("puzzleScene");
