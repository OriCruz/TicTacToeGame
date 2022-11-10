//variables
//#region 
let modal = document.querySelector('.modal');
let modalMsg = document.querySelector('.msg');
let gameStatus = document.querySelector('.gameStatus');
let startBtn = document.querySelector('#start');
let closeModal = document.querySelector('.close');
let cells = document.querySelectorAll('.box');
let restartBtn = document.querySelector('#restart');
let gameRunning = false;//this will change once we start the game
let currentPlayer ='X';
let winCases = [
    //row win
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    //column win
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //diagonal wins
    [0, 4, 8],
    [2, 4, 6]
];
// here we will store the options to then check against the winning options later on
let trackOptions = ["","","","","","","","",""];

//#endregion

startGame();

// event listeners
//#region 
startBtn.addEventListener('click', e =>{
    modal.style.display ='block';
    gameStatus.style.display='block'
});
 closeModal.addEventListener('click', e =>{
    modal.style.display = "none";
    restartBtn.style.display ='inline-block';
    startBtn.style.display='none';
 })
//#endregion

// functions
//#region 
function startGame (){
    
    cells.forEach(cell=> {
        cell.addEventListener('click', cellClicked);});
        //callback function implemented
        // Note to self a callback function is a function that gets invoked when an operation is completed. In this case once the event is clicked, the function is invoked

    restartBtn.addEventListener('click', restartGame);
    gameStatus.innerHTML = `It is ${currentPlayer}'s turn`;
    gameRunning=true;
}

function cellClicked (){
    // here we store the index of the cell/box that is being selected
    const cellIndex = this.getAttribute('index');
    if(trackOptions[cellIndex] !== "" || !gameRunning){
        return;//does nothing
    }
        updateCell(this, cellIndex);//passing the cell that is being cliked and its index
        checkResults();
}

function updateCell(cell, index){
    //prints the currentPlayer's value into the cell that is being clicked 
    trackOptions[index] = currentPlayer;
    cell.innerHTML= currentPlayer;
   
}

function changePlayer(){
    // changes the player's value 
    if(currentPlayer == 'X') {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }
    gameStatus.innerHTML =`It's ${currentPlayer}'s turn`;
}

function checkResults() {

    let roundWon =false;
    for(let i = 0; i<winCases.length; i++){
        let condition = winCases[i];
        //accessing the array inside of the winCases array. It's 2D array so we have to access the  first (like we did above) in order to access the second one.
        // could've also done it like: wincases[i][0]
        console.log(trackOptions);
        let cell1 = trackOptions[condition[0]];
        let cell2 = trackOptions[condition[1]];
        let cell3 = trackOptions[condition[2]];

        //if there are empty spaces we want to skip the iteration in the loop (skips if it's an empty stirng)
        if(cell1 == '' || cell2 == '' || cell3 == ''){
            continue;
        }
        //if the value inside of the trackOptions array equals to the wincase at position i and indexes 1 thru 2 roundWon to true and end the for loop
        if(cell1 == cell2 && cell2 == cell3 ){
            roundWon = true;
            break;
        }
    }
    //if roundWon is true display message currentPlayer win
    if(roundWon){
        gameStatus.innerHTML = `${currentPlayer} Wins!!`;
        gameRunning = false;
    }
    //check for draw condition. If trackOptions doesn't include empty spaces it's a draw 
    else if(!trackOptions.includes("")){
        gameStatus.innerHTML = `It's a draw!`;
        gameRunning = false;
    }
    else{
        changePlayer();
    }
}

 function restartGame(){
    currentPlayer = 'X';
    trackOptions = ["","","","","","","","",""];
    gameStatus.innerHTML = `${currentPlayer}'s turn`;
    cells.forEach(cell=> cell.innerHTML='');
    gameRunning=true;
}

//#endregion

