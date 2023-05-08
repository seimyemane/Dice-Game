"use strict";

import Players from "./GameData.json" assert { type: "json" };
console.log(Players);
console.log(document);

const rollBtn = document.getElementById("rollBtn");

const resetBtn = document.querySelector(".reset-btn");
const oneVSoneBtn = document.querySelector(".oneVSone");
const oneVSbotBtn = document.querySelector(".oneVSbot");
const playerTwoCounter = document.querySelector(".bot-counter");
const playerOneCounter = document.querySelector(".human-counter");
const rollDicePNG = document?.querySelector(".roll-dice");
const playerOneName = document.querySelector(".player-1-name");
const playerTwoName = document.querySelector(".player-2-name");
const buttonsContainer = document.querySelector(".buttons");

//adding event listeners to the buttons
oneVSbotBtn.addEventListener("click", (e) => firstLoad(e));
oneVSoneBtn.addEventListener("click", (e) => firstLoad(e));
//////////////////////////////
rollBtn.addEventListener("click", (e) => handleRoll(e));

resetBtn.addEventListener("click", () => handleReset());
/////////////////////////////////

//on first load
const firstLoad = (e) => {
  const className = e?.target.className;
  if (className === "oneVSone" || className === "oneVSbot") {
    document.querySelector(".first-load").classList?.remove("notHidden");
    document.querySelector(".first-load").classList.add("hidden");
    document?.querySelectorAll(".player")?.forEach((player) => player.remove());
    document.querySelector(".game-container").classList.remove("hidden");
    settingPlayers(className);
  } else {
    window.addEventListener("load", () =>
      document.querySelector(".game-container").classList.add("hidden")
    );
  }
};

firstLoad();
let currentPlayers;
const settingPlayers = (className) => {
  currentPlayers = Players.filter((PlayerName) =>
    className === "oneVSbot"
      ? PlayerName.name !== "Player-2"
      : PlayerName.name !== "Dealer"
  );

  const mappingCurrentPlayers = currentPlayers.map((player) => {
    let html = `
  <div class="player"  >
    <h1 class='${player.name}'>${player.name}</h1>
    <div class="player-container" id="${player.id}"></div>
    <h2>Count: <span class="counter" id="${player.counterID}">${player.currentScore}</span></h2>
  </div>
  
  
  `;

    document
      .querySelector(".game-container")
      .insertAdjacentHTML("afterbegin", html);
  });
  handleActivePlayerFirstLoad();
};
let activePlayer;
let noneActivePlayer;
const handleActivePlayerFirstLoad = () => {
  console.log(noneActivePlayer);
  const player1 = currentPlayers.find((player1) => player1.name === "Player-1");
  const player2 = currentPlayers.find((player2) => player2.name !== "Player-1");

  currentPlayers = [
    {
      ...player1,
      active: true,
    },
    {
      ...player2,
      active: false,
    },
  ];

  activePlayer = currentPlayers.find(
    (activePlayer) => activePlayer.active === true
  );
  noneActivePlayer = currentPlayers.find(
    (noneActivePlayer) => noneActivePlayer.active === false
  );

  //////////////////////
  document
    ?.getElementById(`${activePlayer.id}`)
    .parentElement?.classList?.add("active");
  document
    .getElementById(`${noneActivePlayer.id}`)
    .parentElement.classList.add("noneActive");
  //////////////////////
  document.getElementById(`${activePlayer.id}`).insertAdjacentHTML(
    "afterbegin",
    `
    <img src="./Dice-Game-Images/dice-1.png" class="dice" alt="">
    `
  );
};
let player1Count = 0;
let player2Count = 0;
const handleRoll = () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  document.querySelector(
    ".dice"
  ).src = `./Dice-Game-Images/dice-${randomNumber}.png`;
  const finalActivePlayer = currentPlayers.find(
    (activePlayer) => activePlayer.active === false
  );

  currentPlayers = [
    {
      ...activePlayer,
      active: (activePlayer.active = !activePlayer.active),
      currentScore:
        finalActivePlayer.name === "Player-1"
          ? (player1Count += randomNumber)
          : (player1Count += activePlayer.currentScore),
    },
    {
      ...noneActivePlayer,
      active: (noneActivePlayer.active = !noneActivePlayer.active),
      currentScore:
        finalActivePlayer.name !== "Player-1"
          ? (player2Count += randomNumber)
          : (player2Count += noneActivePlayer.currentScore),
    },
  ];
  const [player1, player2] = currentPlayers;
  document.getElementById(6).textContent = player1.currentScore;
  document.getElementById(0).textContent = player2.currentScore;

  settingDealer();
  handlingBot();
  handleWinner(),
    setTimeout(() => {
      handleActivePlayerSwitch();
    }, 1000);
};

const handleActivePlayerSwitch = () => {
  const activePlayer = currentPlayers.find(
    (activePlayer) => activePlayer.active === true
  );
  const noneActivePlayer = currentPlayers.find(
    (noneActivePlayer) => noneActivePlayer.active === false
  );

  document
    .getElementById(`${activePlayer.id}`)
    .parentElement.classList.remove("noneActive");
  document
    .getElementById(`${activePlayer.id}`)
    .parentElement.classList.add("active");
  document
    .getElementById(`${noneActivePlayer.id}`)
    .parentElement.classList.remove("noneActive");
  document
    .getElementById(`${noneActivePlayer.id}`)
    .parentElement.classList.add("noneActive");
  settingDealer();

  ///////////
  document.querySelectorAll(".dice").forEach((png) => png.remove());

  document.getElementById(`${activePlayer.id}`).insertAdjacentHTML(
    "afterbegin",
    `
      <img src="./Dice-Game-Images/dice-1.png" class="dice" alt="">
      `
  );
};

const handleWinner = () => {
  const winner = currentPlayers?.find((winner) => {
    return winner?.currentScore >= 30;
  });
  console.log(winner);
};

const handlingBot = () => {
  const bot = currentPlayers.find((dealer) => {
    return dealer.name === "Dealer";
  });

  if (bot && bot.active === true) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      currentPlayers = [
        {
          ...activePlayer,
          active: (activePlayer.active = !activePlayer.active),
        },
        {
          ...noneActivePlayer,
          active: (noneActivePlayer.active = !noneActivePlayer.active),
        },
      ];
      document.querySelector(
        ".dice"
      ).src = `./Dice-Game-Images/dice-${randomNumber}.png`;
      document.getElementById(6).textContent = player1Count += randomNumber;

      /////////
    }, 2000);
    setTimeout(() => {
      handleActivePlayerSwitch();
    }, 3000);
  }
};

const handleReset = () => {
  player1Count = 0;
  player2Count = 0;
  document.querySelector(".first-load").classList.add("notHidden");
  document.querySelector(".game-container").classList.add("hidden");
  firstLoad();
};

const settingDealer = () => {
  const dealer = currentPlayers.find((dealer) => {
    return dealer.name === "Dealer";
  });
  if (dealer && dealer.active === false) {
    document.querySelector(".buttons").classList?.remove("hidden");
  } else if (dealer && dealer.active === true) {
    document.querySelector(".buttons").classList?.add("hidden");
  }
  return dealer;
};
