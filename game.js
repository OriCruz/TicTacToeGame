// creating variables
//#region 
let modal = document.querySelector('.modal');
let modalMsg = document.querySelector('.msg')
let modalFooter = document.querySelector('#modalFooter');
let startBtn = document.querySelector('#start');
let closeModal = document.querySelector('.close');
let cells = document.querySelectorAll('.box');
let restartBtn = document.querySelector('#restart');
let gameRunning = false;//this will change once we start the game
// store current player to know who's turn is it, this will be updated later on 
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
let trackOptions = ["","","","","","","","",""]

//#endregion

// functions
//#region 
const startGame = ()=>{
    gameRunning=true;
    for (const cell of cells) {
        cell.addEventListener('click(this)', cellClicked)//callback function implemented
        // Note to self a callback function is a function that gets invoked when an operation is completed. In this case once the event is clicked, the function is invoked
    }
    restartBtn.addEventListener('click', restartGame);
    modalFooter.innerHTML = `It is ${currentPlayer}'s turn`;
}
const cellClicked = ()=>{

    let cellIndex = this.getAttribute('index');//set the cell that is being clicked, to the HTML attribute of index. 
    if(trackOptions[cellIndex] !== "" || !gameRunning){
        return;//does nothing
    }
    else{
        updateCell(this, cellIndex);//passing the cell that is being cliked and its index
        checkResults();
    }
}
const updateCell =(cell, index)=>{
    trackOptions[index] = currentPlayer;
    cell.innerHTML= currentPlayer;
}
const checkResults =()=>{

}
const restartGame=()=>{

}

//#endregion
// event listeners
//#region 
startBtn.addEventListener('click', e =>{
    modal.style.display ='block';
});
 closeModal.addEventListener('click', e =>{
    modal.style.display = "none";
    restartBtn.style.display ='inline-block';
    startBtn.style.display='none';
 })
//#endregion
startGame();