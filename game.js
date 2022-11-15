//variables
//#region 
let modal = document.querySelector('.modal');
let modalMsg = document.querySelector('.msg');
let chooseO= document.querySelector('#choose-O');
let chooseX= document.querySelector('#choose-X');
let gameStatus = document.querySelector('.gameStatus');
let gameCounter =document.querySelector('.games');
// changes the color of the game status
gameStatus.style.color='white';
gameCounter.style.color='white';
let startBtn = document.querySelector('#start');
let closeModal = document.querySelector('.close');
let cells = document.querySelectorAll('.box');
let restartBtn = document.querySelector('#restart');
let gameRunning = false;//this will change once we start the game
let currentPlayer;
let p1;
let winsP1=0, winsP2=0;
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



// event listeners
//#region 
startBtn.addEventListener('click', e =>{
    modal.style.display ='block';
    gameStatus.style.display='block';
    gameCounter.style.display='block';
    
    startGame();
});
chooseO.addEventListener('click', e=>{
    p1='O';
    modal.style.display = "none";
    restartBtn.style.display ='inline-block';
    startBtn.style.display='none';
});
chooseX.addEventListener('click', e=>{
    p1='X';
    modal.style.display = "none";
    restartBtn.style.display ='inline-block';
    startBtn.style.display='none';
});
closeModal.addEventListener('click', e=>{
    modal.style.display='none';
})

//#endregion

// functions
//#region 
function startGame (){
    
    cells.forEach(cell=> {
        cell.addEventListener('click', cellClicked);});
        //callback function implemented
        // Note to self a callback function is a function that gets invoked when an operation is completed. In this case once the event is clicked, the function is invoked

    restartBtn.addEventListener('click', e=> {
        restartGame();
    });
    gameStatus.innerHTML = `It is ${selectCurrentPlayer()}'s turn`;
    gameCounter.textContent=`Player 1: ${winsP1} || Player 2: ${winsP2}`;
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
    //changes the cell's color to white
    cell.style.color='white';
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
    // we want to go thru each element of the winCases array. and then compare the  
    for(let i = 0; i<winCases.length; i++){
        let condition = winCases[i];
        //accessing the array inside of the winCases array. It's 2D array so we have to access the main (like we did above) in order to access the second one.
        //could've also done it like: wincases[i][0]
        console.log(trackOptions);
        let cell1 = trackOptions[condition[0]];
        let cell2 = trackOptions[condition[1]];
        let cell3 = trackOptions[condition[2]];
        console.log(cell1)
        console.log(cell2)
        console.log(cell3)
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
        if(currentPlayer == p1){
        gameStatus.innerHTML = `Player 1 Wins!!`;
        winsP1++;
        gameCounter.textContent=`Player 1: ${winsP1} || Player 2: ${winsP2}`;
        gameRunning = false;
        modal.style.display='block';
        modalMsg.textContent = 'Player 1 wins! player 2 good luck next time!';
        closeModal.style.display='block';
        }
        else{
        gameStatus.innerHTML = `Player 2 Wins!!`;
        // updates the rounds each player has win
        winsP2++;
        gameCounter.textContent=`Player 1: ${winsP1} || Player 2: ${winsP2}`;
        // stops running the game
        gameRunning = false;
        // let imgLoser = document.createElement('img');
        // imgLoser.src='https://media1.giphy.com/media/26n5ZZfTd3cBLoj2E/giphy.gif?cid=ecf05e4796p8kzjhg4789wrvjuz86i25efwdct8tufg9djaw&rid=giphy.gif&ct=g';
        // document.getElementById('msgModal').appendChild(imgLoser);
        modal.style.display='block';
        modalMsg.textContent = 'Player 2 wins!  player 1 good luck next time!';
        closeModal.style.display='block';
        }
 
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
    selectCurrentPlayer();
    trackOptions = ["","","","","","","","",""];
    gameStatus.innerHTML = `${currentPlayer}'s turn`;
    cells.forEach(cell=> cell.innerHTML='');
    gameRunning=true;

}
function selectCurrentPlayer(){
    playerNum = Math.floor(Math.random()*(2-1+1)+1);
    if(playerNum == 1){
        return currentPlayer ='X';
    }
    else{
        return currentPlayer='O';
    }
}


//#endregion

