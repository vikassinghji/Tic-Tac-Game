const reset=document.querySelector(".reset-btn");
const onePlayer=document.querySelector(".one-player-btn");
const twoPlayer=document.querySelector(".two-player-btn");
const xWin=document.querySelector(".x-win");
const OWin=document.querySelector(".y-win");
const msg=document.querySelector("h1");

const boxes=document.querySelectorAll(".box");

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// required value
let Xcount=0;
let Ocount=0;

let currentMode;
let gameGrid;
let currentPlayer;

initGame();
currentMode=onePlayer;
onePlayer.classList.add("active");

// initial condition
function initGame(){
    msg.innerHTML="";
    currentPlayer="X";
    
    boxes.forEach((box)=>{
        box.innerHTML="";
        box.style.pointerEvents="all";
    });

    gameGrid=["","","","","","","","",""];

    xWin.innerHTML=`X: ${Xcount}`;
    OWin.innerHTML=`O: ${Ocount}`;
}


// reset button
reset.addEventListener("click", ()=>{
    setTimeout(initGame,200);
});

// two player button
twoPlayer.addEventListener("click", ()=>{
    onePlayer.classList.remove("active");
    twoPlayer.classList.add("active");
    currentMode=twoPlayer;
    Xcount=0;
    Ocount=0;
    setTimeout(initGame,200);
});

// one player button
onePlayer.addEventListener("click", ()=>{
    onePlayer.classList.add("active");
    twoPlayer.classList.remove("active");
    currentMode=onePlayer;
    Xcount=0;
    Ocount=0;
    setTimeout(initGame,200);
});

// swap X and O
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
}

// handle by click
async function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap turn
        swapTurn();

        // gameover or not
        // ----------------read
        await new Promise(resolve=>setTimeout(resolve,200));
        checkGameOver();

        if(currentMode===onePlayer && currentPlayer==="O" && msg.innerHTML===""){
            setTimeout(handleRobo,500);
        }
    }
}

// handle by computer
function handleRobo(){
    let arr=[];
    for(let i=0;i<9;i++){
        if(gameGrid[i]===""){
           arr.push(i);
        }
    }

    let randomIndx=Math.floor(Math.random()*arr.length);
    let index=arr[randomIndx];
    gameGrid[index]=currentPlayer;
    boxes[index].innerHTML=currentPlayer;

    swapTurn();

    setTimeout(checkGameOver,100);
}

boxes.forEach( (box, index)=>{
    box.addEventListener("click", ()=>{
        // --old version
        // if(currentMode===onePlayer && currentPlayer==="O"){
        //     handleRobo();
        // }
        // else{
        //     handleClick(index);
        // }
        handleClick(index);
    })
});

// check game is over or not
function checkGameOver(){
    let ans="";

    winningPosition.forEach( (position)=>{
        if(gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="" && 
            (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

                if(gameGrid[position[0]]==="X"){
                   ans="X";
                }
                else{
                    ans="O";
                }
                
                boxes.forEach( (box)=>{
                    box.style.pointerEvents="none";
                })
                
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
                

            }
    });
    if(ans!==""){
        if(ans==="X"){
            Won();
        }
        else{
            Loose();
        }
        setTimeout(initGame,1000);
        return;
    }

    let fillCount=0;

    boxes.forEach( (box)=>{
        if(box.innerText!==""){
            fillCount++;
        }
    });

    if(fillCount===9){
        Tied();
        setTimeout(initGame,1000);
    }
};

// win,tie and loose
function Tied(){
    msg.innerHTML="GAME, TIED";
}
function Won(){
    msg.innerHTML="Congratulation, You Won";
    Xcount++;
}
function Loose(){
    msg.innerHTML="Oops, Better Luck Next Time";
    Ocount++;
}

