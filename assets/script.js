// Initial game state
let gameState = {
  rounds: [
    {
      roundNumber: 1,
      questions: [
        {
          question: "Question 1",
          answers: [
            { answer: "Answer 1", points: 20 },
            { answer: "Answers 2", points: 20 },
            { answer: "Answers 3", points: 10 },
            { answer: "Answers 4", points: 10 },
            { answer: "Answers 5", points: 10 },
			{ answer: "Answers 6", points: 10 },
			{ answer: "Answers 7", points: 10 },
            { answer: "Answers 8", points: 10 }
          ]
        },
      ]
    },
    {
      roundNumber: 2,
      questions: [
        {
          question: "Questions 2",
          answers: [
            { answer: "Answer 1", points: 20 },
            { answer: "Answers 2", points: 20 },
            { answer: "Answers 3", points: 10 },
            { answer: "Answers 4", points: 10 },
            { answer: "Answers 5", points: 10 },
			{ answer: "Answers 6", points: 10 },
			{ answer: "Answers 7", points: 10 },
            { answer: "Answers 8", points: 10 }
          ]
        },
      ]
    },
	{
      roundNumber: 3,
      questions: [
        {
          question: "Questions 3",
          answers: [
            { answer: "Answer 1", points: 20 },
            { answer: "Answers 2", points: 20 },
            { answer: "Answers 3", points: 10 },
            { answer: "Answers 4", points: 10 },
            { answer: "Answers 5", points: 10 },
			{ answer: "Answers 6", points: 10 },
			{ answer: "Answers 7", points: 10 },
            { answer: "Answers 8", points: 10 }
          ]
        },
      ]
    },
  ],
  leftTeamPoints: 0,
  rightTeamPoints: 0,
  totalPointsInRound: 0
};

let totalPointsInRound = 0;

document.addEventListener("DOMContentLoaded", function () {
  const leftTeamPointsElement = document.getElementById("left-team-points");
  const rightTeamPointsElement = document.getElementById("right-team-points");
  const questionElement = document.getElementById("question");
  const answersListElement = document.getElementById("answers-list");
  const przerywnikButton = document.getElementById("przerywnik-button");
  const newRoundButton = document.getElementById("new-round-button");
  const leftMistakeButton = document.getElementById("left-mistake-button");
  const rightMistakeButton = document.getElementById("right-mistake-button");
  const leftWinButton = document.getElementById("left-win-button");
  const rightWinButton = document.getElementById("right-win-button");
  const pointsInRoundValue = document.getElementById("points-in-round-value");
  const answersContainer = document.getElementById("answers");
  const correctAnswerSound = new Audio("assets/poprawna-odpowiedz-familiada.mp3");
  const mistakeSound = new Audio("assets/bledna-familiada.mp3");
  const przerywnikSound = new Audio("assets/przerywnik.mp3");

  // Function to load game state into the game
  function loadGameState() {
    // Set left team points
    leftTeamPointsElement.textContent = gameState.leftTeamPoints;
    // Set right team points
    rightTeamPointsElement.textContent = gameState.rightTeamPoints;
  
    // Load current round's question and answers
    const currentRound = gameState.rounds[0]; // Assuming the first round for now
    const currentQuestion = currentRound.questions[0]; // Assuming the first question for now
    questionElement.textContent = currentQuestion.question;
  
    // Clear previous answers
    answersListElement.innerHTML = "";
  
    // Populate player's answer buttons
    currentQuestion.answers.forEach(function (answer, index) {
      const answerItem = document.createElement("li");
      answerItem.className = "single-answer";
      answerItem.dataset.points = answer.points;
      answerItem.dataset.answer = answer.answer;
      answerItem.innerHTML = `<span>${index + 1}.</span>................................................`;
      answersListElement.appendChild(answerItem);
    });
  
    // Load presenter's answer buttons
    const presenterAnswersContainer = document.querySelector(".answers-button-container");
    presenterAnswersContainer.innerHTML = ""; // Clear previous buttons
  
    currentQuestion.answers.forEach(function (answer, index) {
      const answerButton = document.createElement("button");
      answerButton.className = "answer-button";
      answerButton.dataset.points = answer.points;
      answerButton.dataset.answer = answer.answer;
      answerButton.textContent = "Answers " + (index + 1);
      presenterAnswersContainer.appendChild(answerButton);
  
      // Add click event listener to each answer button
      answerButton.addEventListener("click", function () {
        const answer = answerButton.dataset.answer;
        const points = parseInt(answerButton.dataset.points); // Get points from button's dataset
        increasePointsInRound(points);
        revealCorrectAnswer(answer);
        playCorrectAnswerSound();
      });
    });
  
    // Reset points in the round
    gameState.totalPointsInRound = 0;
    pointsInRoundValue.textContent = gameState.totalPointsInRound;
  }
  
  // Function to handle new round button click
  function handleNewRound() {
    const leftTeamMistakesElement = document.getElementById("left-team-mistakes");
    const rightTeamMistakesElement = document.getElementById("right-team-mistakes");

    leftTeamMistakesElement.textContent = "";
    rightTeamMistakesElement.textContent = "";
    pointsInRoundValue.textContent = "0";
    gameState.rounds.shift();
    if (gameState.rounds.length > 0) {
      loadGameState();
    } else {
      console.log("No more rounds available!");
    }
  }

  // Function to reveal the correct answer
  function revealCorrectAnswer(answer) {
    const answerElements = answersContainer.querySelectorAll(".single-answer");
    answerElements.forEach(function (element) {
      if (element.dataset.answer === answer) {
        const dots = element.querySelector("span").nextSibling;
        dots.textContent = answer;
      }
    });
  }

  // Function to play the correct answer sound
  function playCorrectAnswerSound() {
    correctAnswerSound.currentTime = 0;
    correctAnswerSound.play();
  }

  // Function to increase points in round
  function increasePointsInRound(points) {
    gameState.totalPointsInRound += points; // Updated to access totalPointsInRound from gameState
    pointsInRoundValue.textContent = gameState.totalPointsInRound; // Updated to reflect the change in state
  }
  // Function to play the mistake sound
  function playMistakeSound() {
    mistakeSound.currentTime = 0;
    mistakeSound.play();
  }

  // Function to play the przerywnik sound
  function playPrzerywnikSound() {
    przerywnikSound.currentTime = 0;
    przerywnikSound.play();
  }

  // Event listener for new round button click
  newRoundButton.addEventListener("click", handleNewRound);

  // Event listener for left mistake button click
  leftMistakeButton.addEventListener("click", function () {
    const mistakeElement = document.createElement("p");
    mistakeElement.textContent = "X";
    const leftMistakesContainer = document.getElementById("left-team-mistakes");
    leftMistakesContainer.appendChild(mistakeElement);
    playMistakeSound();
  });

  // Event listener for right mistake button click
  rightMistakeButton.addEventListener("click", function () {
    const mistakeElement = document.createElement("p");
    mistakeElement.textContent = "X";
    const rightMistakesContainer = document.getElementById("right-team-mistakes");

    rightMistakesContainer.appendChild(mistakeElement);
    playMistakeSound();
  });

  // Event listener for left win button click
  leftWinButton.addEventListener("click", function () {
    addPointsToLeftTeam();
    playPrzerywnikSound();
  });

  // Event listener for right win button click
  rightWinButton.addEventListener("click", function () {
    addPointsToRightTeam();
    playPrzerywnikSound();
  });

  // Function to add points to the left team
  function addPointsToLeftTeam() {
    const points = parseInt(pointsInRoundValue.textContent);
    const currentPoints = parseInt(gameState.leftTeamPoints);
    const leftTeamPoints = document.getElementById("left-team-points");
    leftTeamPoints.textContent = currentPoints + points;
    pointsInRoundValue.textContent = "0";
    gameState.leftTeamPoints = currentPoints + points;
  }

  // Function to add points to the right team
  function addPointsToRightTeam() {
    const points = parseInt(pointsInRoundValue.textContent);
    const currentPoints = parseInt(gameState.rightTeamPoints);
    const rightTeamPoints = document.getElementById("right-team-points");
    rightTeamPoints.textContent = currentPoints + points;
    pointsInRoundValue.textContent = "0";
    gameState.rightTeamPoints = currentPoints + points;
  }

  przerywnikButton.addEventListener("click", function() {
    playPrzerywnikSound();
  });

  // Load initial game state when the page loads
  loadGameState();
});
