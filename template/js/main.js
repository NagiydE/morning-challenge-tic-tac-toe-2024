//Create a two player Tic-Tac-Toe game. 


//The users should be able to click to place their X or O. 


//if they win the program should mention their win in the DOM.


//if there is a draw the program should mention their win the DOM.


//I want to create this game using a grid system. It seems pretty easy and straightforward, and also easy to style if I have extra time.

//I want to have the cells be activated by a click event that will place the corresponding players x or o in the cell.

// I want to have a pattern that is waiting to be activated. When a specific combo of cells are clicked, I would like it to target a corresponding win. I will put in an else case that will trigger a draw if there are no possible patterns to be made.

let currentStatus= document.querySelector('.status');
let gameActive = true;
let currentPlayer= 'X';
let gameState = ["", "", "", "", "", "",  "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => 'It is a draw!';
const currentTurn = () => `It is ${currentPlayer}s Turn`

currentStatus.innerhtml = currentTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click',  cellClicked)); 
document.querySelector('.reset').addEventListener('click', resetGame);


//This function will handle initial cell click events.

function cellClicked(clickedCellEvent) {   
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );

if (gameState[clickedCellIndex] !=="" ||!gameActive ){
    return;
}

cellPlayed(clickedCell, clickedCellIndex);
resultValidation();

}

//this function will the placing of the Players x/o in the coresponding clicked cell.

function cellPlayed(clickedCell, clickedCellIndex) {
    
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer; //places x/o in cell in DOM.
}

//this will be an array that sets win patterns. 
const winningConditions = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[2,4,6],
[0,4,8]
];

//this function will handle the logic of the game play. It contains a Loop

function resultValidation(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c=== ''){
            continue;
        }
        if (a ===b && b === c){
            roundWon = true;
            break
        }
    }
    if (roundWon){
        currentStatus.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
//triggers draw message to appear on the DOM and ends game.
    let roundDraw= !gameState.includes("");
    if (roundDraw){
        currentStatus.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

//calls player to change.
    playerChange();

}

// This function contains a condensed conditional that swaps the current player from X to O.
function playerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentStatus.innerHTML = currentTurn();
}


//resets the game
function resetGame(){
    gameActive = true;
    currentPlayer = "X"
    gameState = ["", "", "", "", "", "",  "", "", ""];
    currentStatus.innerHTML = currentTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}









