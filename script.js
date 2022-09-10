//Selecting all game field boxes
const box1 = document.querySelector(".game-box-1");
const box2 = document.querySelector(".game-box-2");
const box3 = document.querySelector(".game-box-3");
const box4 = document.querySelector(".game-box-4");
const box5 = document.querySelector(".game-box-5");
const box6 = document.querySelector(".game-box-6");
const box7 = document.querySelector(".game-box-7");
const box8 = document.querySelector(".game-box-8");
const box9 = document.querySelector(".game-box-9");

//Assigning boxes to an array
const boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

//Selecting all game field img boxes

const box1IMG = document.querySelector(".game-img-1");
const box2IMG = document.querySelector(".game-img-2");
const box3IMG = document.querySelector(".game-img-3");
const box4IMG = document.querySelector(".game-img-4");
const box5IMG = document.querySelector(".game-img-5");
const box6IMG = document.querySelector(".game-img-6");
const box7IMG = document.querySelector(".game-img-7");
const box8IMG = document.querySelector(".game-img-8");
const box9IMG = document.querySelector(".game-img-9");

//Assigning boxes to an img array
const boxIMGArray = [
  box1IMG,
  box2IMG,
  box3IMG,
  box4IMG,
  box5IMG,
  box6IMG,
  box7IMG,
  box8IMG,
  box9IMG,
];

//Selecting modal and button

const button = document.querySelector(".close-button");
const modal = document.querySelector(".modal-content");
const modalText = document.querySelector(".modal-content__player");

//Defining gamefield, making a "matrix"
let row1 = [0, 0, 0];
let row2 = [0, 0, 0];
let row3 = [0, 0, 0];
let col1 = [];
let col2 = [];
let col3 = [];
let leftDiag = [];
let rightDiag = [];

//Selecting players
const player1Info = document.querySelector(".title-section__player-1");
const player2Info = document.querySelector(".title-section__player-2");

//Setting initial values, player1 will always have O, player 2 X
let player1 = "O";
let player2 = "X";
let turn = "player1";
let src = "O"; //source that will be used to set img for a box
let round = 0; //round counter

// Highlighting turn of active player

function highlightPlayer() {
  if (turn === "player1") {
    player1Info.classList.add("highlight");
    player2Info.classList.remove("highlight");
  } else if (turn === "player2") {
    player2Info.classList.add("highlight");
    player1Info.classList.remove("highlight");
  }
}

//Receiving which box was clicked by user

function clickedBox(e) {
  let clickedBoxPath = e.path[0].classList[1];
  let clickedBoxLength = clickedBoxPath.length;
  let clickedBox = clickedBoxPath[clickedBoxLength - 1];
  return clickedBox;
}

//Filling matrix with "O" or "X"

function assignMatrix(clickedBox, value) {
  if (clickedBox <= 3) {
    row1[clickedBox - 1] = value;
  } else if (clickedBox > 3 && clickedBox <= 6) {
    row2[clickedBox - 4] = value;
  } else if (clickedBox > 6) {
    row3[clickedBox - 7] = value;
  }

  //Assigning value to columns and diagonal lines

  col1 = [row1[0], row2[0], row3[0]];
  col2 = [row1[1], row2[1], row3[1]];
  col3 = [row1[2], row2[2], row3[2]];
  leftDiag = [row1[0], row2[1], row3[2]];
  rightDiag = [row1[2], row2[1], row3[0]];
}

//Checking if all values in rows and columns are the same (all O or all X)

function checkAllEqual(array) {
  const result = array.every((element) => {
    if (element === array[0] && element != 0) {
      return true;
    }
  });

  return result;
}

//Function that checks if player1 or player2 won

function checkWinner() {
  let win = "";
  if (checkAllEqual(row1)) {
    win = true;
  } else if (checkAllEqual(row2)) {
    win = true;
  } else if (checkAllEqual(row3)) {
    win = true;
  } else if (checkAllEqual(col1)) {
    win = true;
  } else if (checkAllEqual(col2)) {
    win = true;
  } else if (checkAllEqual(col3)) {
    win = true;
  } else if (checkAllEqual(leftDiag)) {
    win = true;
  } else if (checkAllEqual(rightDiag)) {
    win = true;
  } else return false;

  return win;
}

//Checking for a draw

function checkDraw() {
  if (round >= 9) {
    return true;
  }
}

//Setting variables to initial values

function gameRestart() {
  round = 0;
  row1 = [0, 0, 0];
  row2 = [0, 0, 0];
  row3 = [0, 0, 0];
  col1 = [];
  col2 = [];
  col3 = [];
  leftDiag = [];
  rightDiag = [];
  for (let index = 0; index < boxIMGArray.length; index++) {
    const element = boxIMGArray[index];
    element.src = "";
    console.log(element.src);
  }

  for (let index = 0; index < boxArray.length; index++) {
    boxArray[index].classList.remove("inactive");
  }
}

//Assigning src

function imgSRC() {
  if (turn === "player1") {
    src = "O";
  } else if (turn === "player2") {
    src = "X";
  }
  return src;
}

//Game logic

function gameStart() {
  for (let index = 0; index < boxArray.length; index++) {
    boxArray[index].addEventListener("click", (e) => {
      boxIMGArray[index].src = `./Assets/${src}.svg`;
      console.log(src);
      console.log(turn);
      if (turn === "player1") {
        turn = "player2";
        imgSRC();
        highlightPlayer();
        assignMatrix(clickedBox(e), player1);
        boxArray[index].classList.add("inactive");
        round += 1;
        if (checkWinner()) {
          modalText.textContent = "Player 1 wins!";
          modal.classList.remove("hidden");
          modal.classList.add("show");
          gameRestart();
        }
        if (checkDraw()) {
          modalText.textContent = "Draw!";
          modal.classList.remove("hidden");
          modal.classList.add("show");
          gameRestart();
        }
      } else if (turn === "player2") {
        turn = "player1";
        imgSRC();
        highlightPlayer();
        assignMatrix(clickedBox(e), player2);
        boxArray[index].classList.add("inactive");
        round += 1;
        if (checkWinner()) {
          modalText.textContent = "Player 2 wins!";
          modal.classList.remove("hidden");
          modal.classList.add("show");
          gameRestart();
        }
        if (checkDraw()) {
          modalText.textContent = "Draw!";
          modal.classList.remove("hidden");
          modal.classList.add("show");
          gameRestart();
        }
      }
    });
  }
}

//Button listener

button.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("show");
});

//Calling functions

highlightPlayer(); //highlighting player in first round
gameStart();
