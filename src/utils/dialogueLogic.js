import { gameState } from "../stateManager/stateManager";

// DIALOGUE //
export async function displayDialogue(text, onDisplayEnd) {
  gameState.setFreezePlayer(true);
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");

  dialogueUI.style.display = "block";

  let index = 0;
  let currentText = "";
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }
    clearInterval(intervalRef);
  }, 5);

  const closeBtn = document.getElementById("close");
  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
  }
  closeBtn.addEventListener("click", onCloseBtnClick);
}

// CHIFFER //
export function displayChifferDialogue(text, onDisplayEnd) {
  gameState.setFreezePlayer(true);
  const dialogueUI = document.getElementById("chiffer-container");
  const dialogue = document.getElementById("chiffer-dialogue");

  dialogueUI.style.display = "block";
  console.log(text);

  let index = 0;
  let currentText = "";
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }

    clearInterval(intervalRef);
  }, 5);

  const checkBtn = document.getElementById("check-key");
  function onCheckBtnClick() {
    const input1 = document.getElementById("input-1").value.toLowerCase();
    const input2 = document.getElementById("input-2").value.toLowerCase();
    const input3 = document.getElementById("input-3").value.toLowerCase();
    const input4 = document.getElementById("input-4").value.toLowerCase();

    checkLetter(input1, "input-1", "l");
    checkLetter(input2, "input-2", "o");
    checkLetter(input3, "input-3", "v");
    checkLetter(input4, "input-4", "e");
  }
  checkBtn.addEventListener("click", onCheckBtnClick);

  function checkLetter(elementValue, element, correctValue) {
    if (elementValue === correctValue) {
      document.getElementById(element).style.borderColor = "green";
    } else {
      document.getElementById(element).style.borderColor = "red";
    }
  }

  const closeBtn = document.getElementById("close-chiffer");
  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
  }

  closeBtn.addEventListener("click", onCloseBtnClick);
}

// AHRI //
export function displayAhriDialogue(text, onDisplayEnd) {
  gameState.setFreezePlayer(true);
  const dialogueUI = document.getElementById("ahri-textbox-container");
  const dialogue = document.getElementById("ahri-dialogue");

  dialogueUI.style.display = "block";

  let index = 0;
  let currentText = "";
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }
    clearInterval(intervalRef);
  }, 5);

  const computer = document
    .getElementById("pokemonGo")
    .addEventListener("click", returnChoiceText);
  const phone = document
    .getElementById("wobble")
    .addEventListener("click", returnChoiceText);
  const consoleG = document
    .getElementById("swimming")
    .addEventListener("click", returnChoiceText);

  function returnChoiceText(event) {
    const choice = event.target.id;

    let text = "";
    switch (choice) {
      case "pokemonGo":
        text = "Pokemon Go är roligt, då går vi och utforskar mycket!";
        break;
      case "wobble":
        text = "Wobble skål är min favorit också!!";
        break;
      case "swimming":
        text = "Bada i havet kan vara roligt, men jag vågar inte simma...";
        break;
    }
    return removeButtonsShowAnswer(text);
  }

  function removeButtonsShowAnswer(text) {
    console.log(text);
    let index = 0;
    let currentText = "";
    const intervalRef = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        dialogue.innerHTML = currentText;
        index++;
        return;
      }
      clearInterval(intervalRef);
    }, 5);
  }

  const closeBtn = document.getElementById("ahri-close");
  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
  }
  closeBtn.addEventListener("click", onCloseBtnClick);
}
