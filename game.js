// creating variables for the HTML elements
//#region 
let modal = document.querySelector('.modal');
let btnStart = document.querySelector('#start');
let closeSpan = document.querySelector('.close');
//#endregion

// event listeners
//#region 
btnStart.addEventListener('click', function(){
    modal.style.display ='block';
});
 closeSpan.addEventListener('click', function (){
    modal.style.display = "none";
 })
//#endregion