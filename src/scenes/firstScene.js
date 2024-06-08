import { colorizeBackground } from "../utils";

export default function firstScene(kaBoom) {
  colorizeBackground(kaBoom, 76, 170, 255);

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

  startBtn.addEventListener("click", startGame);

  kaBoom.go("firstScene");
}
