import { dialogueData, scaleFactor, background } from "../constants";
import { kaBoom } from "../kaboomCtx";
import { displayDialogue, setCamScale, displayFirstDialogue } from "../utils";
import ChangeScene from "../world";

export default function firstScene() {
  kaBoom.setBackground(kaBoom.Color.fromHex(background));

  const greetingContainer = document.getElementById("first-textbox-container");
  const dialogue = document.getElementById("first-dialogue");
  const startBtnContainer = document.getElementById("first-btn-container");

  greetingContainer.style.display = "block";
  greetingContainer.style.marginTop = "7%";

  let text =
    "Grattis på födelsedagen älskling!" +
    "<br>" +
    "<br>" +
    "Du kan vara lite svår att köpa present till ibland men du tycker om klurigheter så jag gjorde en spel till dig som du måste ta dig igenom för att hitta din slutgiltiga present." +
    "<br>" +
    "<br>" +
    "Jag älskar dig ♥︎";
  let index = 0;
  let currentText = "";

  function typeWriter() {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      setTimeout(typeWriter, 30);
      if (index >= text.length) {
        startBtnContainer.style.display = "block";
        startBtnContainer.style.width = "100%";
        startBtnContainer.style.textAlign = "center";
        startBtnContainer.style.marginTop = "2%";
      }
    }
  }
  typeWriter();

  kaBoom.scene("firstScene", async () => {
    const startBtn = document.getElementById("start");
    function startGame() {
      greetingContainer.style.display = "none";
      ChangeScene("main");
    }
    startBtn.addEventListener("click", startGame);
    //greetingContainer.append(currentText);
    // const greeting = setTimeout(myGreeting, 300);
    // function myGreeting() {
    //   displayFirstDialogue(dialogueData.secondPrompt, () => ({}));
    // }
  });

  kaBoom.go("firstScene");
}
