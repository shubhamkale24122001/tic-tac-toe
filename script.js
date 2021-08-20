const x_class= 'x';
const o_class= 'o';
const winningCombinations=[
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

let oTurn= false;

const cells= document.querySelectorAll('.cell');
const board= document.getElementById('board');
const message= document.getElementById('winning-message-text');
const messageElement= document.getElementById('winning-message');
const restartButton= document.getElementById('restart-button');

startGame();

restartButton.addEventListener('click',startGame);

function startGame(){
    cells.forEach((cell)=>{
        cell.classList.remove(o_class);
        cell.classList.remove(x_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once:true}); //once: true allows event listner to fire only once
    });
    setBoardHover();
    messageElement.classList.remove('show');
}


function handleClick(e){
    const cell= e.target;
    const currentClass= oTurn ? o_class: x_class;
    cell.classList.add(currentClass);
    if(win(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        oTurn= !oTurn;
        setBoardHover();
    }
}

function win(currentClass){
    return winningCombinations.some((combination)=>{
        return combination.every((index)=>{
            return cells[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw){
    if(draw){
        message.innerHTML='Draw !';
    }
    else{
        message.innerHTML=`${oTurn ? 'O' : 'X'} Wins !`;
    }
    messageElement.classList.add('show');
}

function isDraw(){
    return [...cells].every((cell)=>{
        return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    });
}

function setBoardHover(){
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    board.classList.add(oTurn ? o_class : x_class);
}