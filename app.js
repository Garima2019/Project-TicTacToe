let boxs = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn=document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame =()=>{
    turnO = true;
    count =0;
    enableBoxes();
    msgContainer.classList.add("hide");
}


boxs.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            //Player O
            box.innerText = "O";
            turnO = false;
        }else{
            //Player X
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText=`Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes=()=>{
    for(let box of boxs){
        box.disabled=true;
    }
}

const enableBoxes =()=>{
    for(let box of boxs){
        box.disabled= false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val = boxs[pattern[0]].innerText;
        let pos2Val = boxs[pattern[1]].innerText;
        let pos3Val = boxs[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
               showWinner(pos1Val);
                return true;
            }
        }
    }
}

newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);