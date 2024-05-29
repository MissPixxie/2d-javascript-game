// FIRST DIALOGUE //
export function displayFirstDialogue(text, onDisplayEnd) {
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

// DIALOGUE //
export function displayDialogue(text, onDisplayEnd) {
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
  console.log(text);
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

// CAMERA //
export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
    return;
  }

  k.camScale(k.vec2(1.5));
}
