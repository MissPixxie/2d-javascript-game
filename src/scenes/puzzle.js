import { gameState } from "../stateManager/stateManager.js";
import { colorizeBackground } from "../utils.js";

export default async function puzzleScene(kaBoom) {
  gameState.setPreviousScene("puzzleScene");
  gameState.setCurrentScene("puzzleScene");
  const currentScene = gameState.getCurrentScene();

  colorizeBackground(kaBoom, 76, 170, 255);

  const puzzleContainer = document.getElementById("puzzleContainer");
  const boardContainer = document.getElementById("boardContainer");

  const backBtn = document.getElementById("backBtn");
  //puzzleContainer.style.display = "block";
  puzzleContainer.style.backgroundColor = "#202121";
  puzzleContainer.style.display = "flex";
  puzzleContainer.style.flexWrap = "wrap";
  puzzleContainer.style.justifyContent = "center";
  puzzleContainer.style.alignItems = "center";

  const puzzleBoard = document.getElementById("board");

  puzzleBoard.style.width = "1000px";
  puzzleBoard.style.height = "700px";
  puzzleBoard.style.display = "flex";
  puzzleBoard.style.flexWrap = "wrap";

  var columns = 4;
  var rows = 3;

  var currTile;
  var otherTile; // blank tile

  var imgOrder = [
    "8",
    "2",
    "6",
    "1",
    "9",
    "3",
    "10",
    "4",
    "11",
    "5",
    "12",
    "7",
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "/images/" + imgOrder.shift() + ".jpg";

      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
    }
  }

  function dragStart() {
    currTile = this;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {}

  function dragDrop() {
    otherTile = this;
  }

  function dragEnd() {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
  }

  const puzzleImages = document.images;

  for (let i = 0; i < puzzleImages.length; i++) {
    puzzleImages[i].style.width = "220px";
    puzzleImages[i].style.height = "228px";
    puzzleImages[i].style.border = "3px solid #202121";
  }

  function backToMain() {
    puzzleContainer.style.display = "none";
    gameState.setPreviousScene("puzzleScene");
    kaBoom.go("apartmentScene");
  }

  backBtn.addEventListener("click", backToMain);

  // const shuffleButton = document.getElementById("shuffleBtn");
  // function shuffleImages() {
  //   let shuffledArray = imgOrder.slice();
  //   console.log(shuffledArray);
  //   for (let i = shuffledArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffledArray[i], shuffledArray[j]] = [
  //       shuffledArray[j],
  //       shuffledArray[i],
  //     ];
  //   }
  //   return shuffledArray;
  // }

  // shuffleButton.addEventListener("click", shuffleImages);

  // function createPuzzle() {
  //   const tomArrayTillBilder = [];
  //   const imageSrc = [
  //     "/images/1.jpg",
  //     "/images/2.jpg",
  //     "/images/3.jpg",
  //     "/images/4.jpg",
  //     "/images/5.jpg",
  //     "/images/6.jpg",
  //     "/images/7.jpg",
  //     "/images/8.jpg",
  //     "/images/9.jpg",
  //     "/images/10.jpg",
  //     "/images/11.jpg",
  //     "/images/12.jpg",
  //   ];

  //   class Box {
  //     constructor(index, item) {
  //       this.index = index;
  //       this.item = item;
  //     }
  //     changeItem(newItem) {
  //       this.item = newItem;
  //     }
  //   }

  //   class Tile {
  //     constructor(index, position, src) {
  //       this.index = index;
  //       this.position = position;
  //       this.src = src;
  //     }
  //     changePosition(newPosition) {
  //       this.position = newPosition;
  //     }
  //   }

  //   function skapaBildObjekt() {
  //     for (let i = 0; i < imageSrc.length; i++) {
  //       let position = i + 1;
  //       const tile = new Tile(position, 0, imageSrc[i]);
  //       laggBilderIBox(position, tile);
  //     }
  //   }

  //   function laggBilderIBox(index, tile) {
  //     const box = new Box(index, tile);
  //     tomArrayTillBilder.push(box);
  //   }

  //   function skapaSlumpmassigPosition() {
  //     for (let i = 0; i < tomArrayTillBilder.length; i++) {
  //       let position = Math.floor(Math.random() * 12) + 1;
  //       return position;
  //     }
  //   }

  //   function shuffleImages() {
  //     skapaBildObjekt();
  //     for (let i = 0; i < tomArrayTillBilder.length; i++) {
  //       let newPosition = skapaSlumpmassigPosition();
  //       tomArrayTillBilder[i].item.changePosition(newPosition);
  //       let position = tomArrayTillBilder[i].item.position;
  //       let src = tomArrayTillBilder[i].item.src;
  //       console.log(src);
  //       createHtmlTile(position, src);
  //     }
  //   }

  //   shuffleImages();

  //   function createHtmlTile(position, tileObject) {
  //     let tile = document.createElement("img");
  //     tile.id = position;
  //     tile.src = tileObject;

  //     tile.addEventListener("dragstart", dragStart);
  //     tile.addEventListener("dragover", dragOver);
  //     tile.addEventListener("dragenter", dragEnter);
  //     tile.addEventListener("dragleave", dragLeave);
  //     tile.addEventListener("drop", dragDrop);
  //     tile.addEventListener("dragend", dragEnd);

  //     document.getElementById("board").append(tile);
  //     console.log(tile);
  //   }

  //   function dragStart() {
  //     currTile = this;
  //   }

  //   function dragOver(e) {
  //     e.preventDefault();
  //   }

  //   function dragEnter(e) {
  //     e.preventDefault();
  //   }

  //   function dragLeave() {}

  //   function dragDrop() {
  //     otherTile = this;
  //   }

  //   function dragEnd() {
  //     let currImg = currTile.src;
  //     let otherImg = otherTile.src;
  //     currTile.src = otherImg;
  //     otherTile.src = currImg;
  //   }

  //   const puzzleImages = document.images;

  //   for (let i = 0; i < puzzleImages.length; i++) {
  //     puzzleImages[i].style.width = "220px";
  //     puzzleImages[i].style.height = "228px";
  //     puzzleImages[i].style.border = "3px solid #202121";
  //   }
  // }

  // createPuzzle();

  // funktion tar bort bitarna
  function clearPieces(tile) {}
}
