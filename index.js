var userScore = 0;
var compScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.getElementsByClassName("score-board");
const result_div = document.querySelector("div.result").querySelector("p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");

function game(userChoice){
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":
            
            win(userChoice,computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice,computerChoice);
            
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice,computerChoice );
            break;
    }
    
}

function win(user,computer){
    userScore++;
    userScore_span.innerHTML = userScore;
    
    result_div.innerHTML= convertToWords(user) + " beats " + convertToWords(computer) + " . You Win!!";
    const list = document.getElementsByClassName(convertToWordsLite(user));
    list[0].classList.add("green-glow");
    setTimeout(function(){
        list[0].classList.remove("green-glow");
    },1000)
    playSound("blue");
    logResult(user, computer);
}

function lose(user,computer){
    compScore++;
    computerScore_span.innerHTML = compScore;
    result_div.innerHTML= convertToWords(computer) + " beats " + convertToWords(user) + " . You Lose..";
    const list = document.getElementsByClassName(convertToWordsLite(user));
    list[0].classList.add("red-glow");
    setTimeout(function(){
        list[0].classList.remove("red-glow");
    },1000)
    playSound("wrong");
    logResult(user, computer);
}

function draw(user,computer){
    result_div.innerHTML="DRAW!!";
    result_div.innerHTML= convertToWords(user) + " same as " + convertToWords(computer) + " . DRAW!!";
    const list = document.getElementsByClassName(convertToWordsLite(user));
    list[0].classList.add("gray-glow");
    setTimeout(function(){
        list[0].classList.remove("gray-glow");
    },1000)
    playSound("yellow");
    logResult(user, computer);
}
 function convertToWords(letter){
    if (letter==="r") return "Rock";
    if (letter==="p") return "Paper";
    return "Scissors";
 }

 function convertToWordsLite(letter){
    if (letter==="r") return "rock";
    if (letter==="p") return "paper";
    return "scissors";
 }

function getComputerChoice(){
    const choices=['r','p','s'];
    var rand=Math.random()*3;
    rand=Math.floor(rand);
    return(choices[rand]);
}

function main(){
    rock_div.addEventListener("click",function(){
        game("r");
    });

    paper_div.addEventListener("click",function(){
        game("p");
    })

    scissors_div.addEventListener("click",function(){
        game("s");
    })

}

function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3")
    audio.play();
}


function logResult(user, computer){  
    const leaderboard = document.getElementById("leaderboard");  
    const currentTime = new Date().toLocaleTimeString();  
    let result;  
    if (user === computer){    
        result = `${convertToWords(user)}(user) matches ${convertToWords(computer)}(comp) at ${currentTime} `;  
    } 
    else if ((user === "r" && computer === "s") || (user === "p" && computer === "r") ||    (user === "s" && computer === "p")  ) {
        result = `${convertToWords(user)}(user) beats ${convertToWords(computer)}(comp) at ${currentTime}`;  
    }
    else {    
        result = `${convertToWords(computer)}(comp) beats ${convertToWords(user)}(user) at ${currentTime}`;  
    }  
    const listItem = document.createElement("li");  
    listItem.textContent = result;  
    leaderboard.appendChild(listItem);
}

main();

