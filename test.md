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
` <img src="./Dice-Game-Images/dice-1.png" class="dice" alt=""> `
);
