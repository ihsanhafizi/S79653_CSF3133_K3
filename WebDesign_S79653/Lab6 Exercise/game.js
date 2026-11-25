let playerName = "";
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = [];

function startGame() {
    playerName = document.getElementById("playerName").value.trim();
    
    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }
    
    gameStarted = true;
    
    document.getElementById("welcome").innerHTML = "Welcome, " + playerName + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
    document.getElementById("result").innerHTML = "Choose Rock, Paper or Scissors.";
    document.getElementById("result").style.color = "#243447";
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    
    return choices[randomIndex];
}

function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }
    
    const computerChoice = getComputerChoice();
    let roundResult;
    
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {        
        roundResult = "Win";
        wins++;
    } else {
        roundResult = "Lose";
        losses++;
    }
    
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";
    
    const resultElement = document.getElementById("result");
    
    resultElement.innerHTML = 
    playerName + ": " + playerChoice + 
    " | Computer: " + computerChoice + 
    " | " + roundResult;
    
    if (roundResult === "Win") {        
        resultElement.style.color = "green";
    } else if (roundResult === "Lose") {
        resultElement.style.color = "red";
    } else {
        resultElement.style.color = "grey";
    }
    
    results.push(roundResult);
    
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;
    
    const roundNumber = results.length;
    
    document.getElementById("historyBody").innerHTML +=
    "<tr><td>" + roundNumber +
    "</td><td>" + playerChoice +
    "</td><td>" + computerChoice +
    "</td><td>" + roundResult +
    "</td></tr>";
    
    document.getElementById("summary").innerHTML = "";
}

function showSummary() {
    let totalWins = 0;
    
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            totalWins++;
        }
    }
    
    const totalRounds = results.length;
    let winPercentage = 0;
    
    if (totalRounds > 0) {
        winPercentage = Math.round((totalWins / totalRounds) * 100);
    }
    
    document.getElementById("summary").innerHTML = 
    "You played " + totalRounds + 
    " rounds and won " + winPercentage + "%.";
}

function resetGame() {
    gameStarted = false;
    playerName = "";
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];
    
    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";
    
    document.getElementById("historyBody").innerHTML = "";
    
    document.getElementById("result").innerHTML = 
    "Game has been reset. Click Start Game.";
    
    document.getElementById("result").style.color = "#243447";
    
    document.getElementById("summary").innerHTML = "";
    document.getElementById("welcome").innerHTML = "";
    document.getElementById("startTime").innerHTML = "";
    
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}