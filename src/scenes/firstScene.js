import { colorizeBackground } from "../utils";

export default function firstScene(kaBoom) {
  colorizeBackground(kaBoom, 76, 170, 255);

  const greetingContainer = document.getElementById("first-textbox-container");
  const dialogue = document.getElementById("first-dialogue");
  const startBtnContainer = document.getElementById("first-btn-container");
  const startBtn = document.getElementById("start");

  greetingContainer.style.display = "block";
  greetingContainer.style.marginTop = "7%";

  let text =
    "Grattis i efterskott älskling!" +
    "<br>" +
    "<br>" +
    'Förlåt, det tog längre tid än jag trodde men här är din present! Du tycker om klurigheter så jag gjorde en spel till dig som du måste ta dig igenom för att hitta din slutgiltiga present, det kommer utspela sig både i datorn och i "verkligheten", have fun!' +
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
      setTimeout(typeWriter, 20);
      if (index >= text.length) {
        startBtnContainer.style.display = "block";
        startBtnContainer.style.width = "100%";
        startBtnContainer.style.textAlign = "center";
        startBtnContainer.style.marginTop = "2%";
      }
    }
  }
  typeWriter();

  function startGame() {
    greetingContainer.style.display = "none";
    kaBoom.go("apartmentScene");
    kaBoom.loadSound("soundtrack", "../8-bit-dream-land-142093.mp3");
    const soundtrack = kaBoom.play("soundtrack", {
      volume: 0.2,
      loop: true,
    });

    kaBoom.volume(0.5);
  }

  startBtn.addEventListener("click", startGame);
}
