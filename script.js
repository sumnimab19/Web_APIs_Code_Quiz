var buttonEl = document.querySelector(".start");
var sectionEl = document.querySelector(".section");
var timeEl = document.querySelector(".timer");
var mainEl = document.querySelector(".main");
var sectionOneEl = document.querySelector(".questionOne");

// List of questions and correct answer
var questionObj = [
  { question: "Inside which HTML element do we put the JavaScript?",
    answer: ["<script>", "<js>","<javascript>", "<scripting>"],
    correctAnswer: "<script>"},

  { question: "Where is the correct place to insert a JavaScript?",
    answer: ["The <body> section", "The <head> section", "Both the <head> and the <body> section", "None of the Above"],
    correctAnswer: "The <body> section"},
  
  { question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answer: ["<script name = 'xxx.js'>", "<script href = 'xxx.js'>", "<script src = 'xxx.js'>", "<style src = 'xxx.js'>"],
    correctAnswer: "<script src = 'xxx.js'>"},
  
  { question: "How do you write 'Hello World' in an alert box?",
    answer: ["alert('Hello World')", "msgBox('Hello World')", "alertBox('Hello World')", "msg('Hello World')"],
    correctAnswer: "alert('Hello World')"},
  
  { question: "How do you create a function in JavaScript?",
    answer: ["function:myFunction()", "function = myFunction()", "function myFunction()", "function myFunction"],
    correctAnswer: "function myFunction()" }
];


var score = 0;
var timerInterval;

// Timer starts at 60 seconds at the beginning of the quiz.
var secondsLeft = 25;
timeEl.textContent = "Time: " + secondsLeft;

var storedValues = [];

var sectionArray = ["qone","qtwo","qthree","qfour","qfive"];

// Start Quiz button clicked
buttonEl.addEventListener("click", function(){
    sectionEl.style.display = "none";
    setTime();
    questionList();
});

// Timer functions
function setTime() {
    timerInterval = setInterval(updateTimer, 1000);
}   

function updateTimer() {
  secondsLeft--;
  timeEl.textContent = "Time: " + secondsLeft;

  // When timer reaches at 0, timer stops and Final Score page shows up.
  if(secondsLeft === 0) {
    clearInterval(timerInterval);
  } 
  if(secondsLeft === 1)
    finalScoreMessage();
  }


  getValueFromLocalStorage();

  console.log(storedValues)



 // Another <section> tag created inside <main> tag with some styles and attribute to store a question/answer set
 
 var nextQuestionIndex = 0;
 var lastQuestionIndex = questionObj.length;
 var dataIndex = 0; // I may not need this. TAKE A LOOK AT IT LATER.
 var nextSectionIndex = 0;

 // This function displays the question and 4 answer options
 function questionList(){ 

   // Question is appear in <h4> tag.
   // trial code 4/24
 var questionSectionEl = document.createElement("section");
 questionSectionEl.setAttribute("class",sectionArray[nextSectionIndex]);
 mainEl.appendChild(questionSectionEl);
 questionSectionEl.style.textAlign = "center";
 questionSectionEl.style.margin = "50px";
 questionSectionEl.style.padding = "50px";

 
      
  
   
    var questionEl = document.createElement("h4"); 
    questionEl.setAttribute("data-index", dataIndex);
    questionEl.setAttribute("class", "qHeader");
    questionEl.textContent = JSON.stringify(questionObj[nextQuestionIndex].question); 
    questionSectionEl.appendChild(questionEl);
        
    //<ol> tag created inside section to hold 4 answer options
    var answerolEl = document.createElement("ol");
    answerolEl.setAttribute("class","ol");
    answerolEl.setAttribute("data-index", dataIndex); // I MAY NOT NEED THIS. TAKE A LOOK AT IT LATER.
    questionSectionEl.appendChild(answerolEl);

    // <li> tag is created to hold each of the 4 answer options
    for (var j = 0; j < 4; j++) {
      var answerliEl = document.createElement("li"); 
      answerliEl.textContent = (questionObj[nextQuestionIndex].answer[j]);
      answerolEl.appendChild(answerliEl);
      questionSectionEl.style.textAlign = "left";
      questionSectionEl.style.lineHeight = "40px";
    }
    
    // Added <hr> tag to show a line after each question/answer set
    var hrEl = document.createElement("hr"); 
    questionSectionEl.appendChild(hrEl);
    hrEl.style.marginBottom = "0px";

    var answerCheckEl = document.createElement("h4"); 
    answerCheckEl.setAttribute("class", "resultText");  
    questionSectionEl.appendChild(answerCheckEl);
    
    // Event Delegation: Added click event to entire <ol> tag instead of just for each <li> tag. Click Event will bubble up to it's (<li> tag) parent which is <ol> and gets executed
    answerolEl.addEventListener("click", checkAnswer);     
  }



// This function checks the answer for each question. 'nextQuestionIndex' will get to the next question every cycle
function checkAnswer(e){
  // alert("are you there?")
  // selectedAnswer stores the value of the option user has clicked
  var selectedAnswer = e.target.textContent;  
  e.preventDefault();
  //var secondSection = document.querySelector("." + sectionArray[nextSectionIndex]);
  
  var answerCheckEl = e.target.parentNode.parentNode.querySelector(".resultText");

  
  // var answerCheckEl = document.createElement("h4"); 

  //console.log(answerCheckEl);

  //If the selectedAnswer matches the correctAnswer from the questionObj object's, score is increased by 10 points. And result will display as Correct or Wrong at the bottom.    
  if (selectedAnswer === questionObj[nextQuestionIndex].correctAnswer) {
    // Increase score
      score = score + 10;
      answerCheckEl.textContent = "Correct";
      answerCheckEl.style.color = "green";
      answerCheckEl.style.marginBottom = "40px";
     
      
      
  } else {

    // If the selectAnswer does not match the correctAnswer, score decreases by 2 and Time left is also decreases by 10 seconds. And result will display as Wrong at the bottom.
      //score = score - 2;
      if(secondsLeft <= 1){
        hideAllSection();
        return;
      } else {
      secondsLeft = secondsLeft - 10;
      
      answerCheckEl.textContent = "Wrong";
      answerCheckEl.style.color = "red"; 
      answerCheckEl.style.marginBottom = "40px";  

      
      
      }
    
  }

  // nextQuestion function is called to get another question from the questionObj object
  setTimeout(nextQuestion, 1000);
  //nextQuestion();
  
}

// This function is to get another question from the questionObj object.
function nextQuestion(){
  y = document.querySelector("." + sectionArray[nextSectionIndex]);
  y.style.display = "none";

  
  nextQuestionIndex++;
  dataIndex++; // I MAY NOT NEED THIS. TAKE A LOOK AT IT LATER.
  nextSectionIndex++;
  
  // When the user gets to the last question, final score section will display. Otherwise, displays another question from the list in object
  if(nextQuestionIndex === lastQuestionIndex)  {
    finalScoreMessage();
  } else  {
    // document.querySelector(".qone").style.display = "none";
    questionList();
  } 
}


// This function displays user's final score along with input box to put their initial and button to save the highscore.
function finalScoreMessage(){

  // Hiding the question list section --  THIS NEEDS TO BE FIXED.
  //var x = document.querySelector("." + sectionArray[nextSectionIndex]);
  
  hideAllSection();
  
  
  secondsLeft = 1;
   
  // Creating multiple elements to store score, inut initial and submit button 
  var finalScorePage = document.createElement("section");
  finalScorePage.setAttribute("class","final");
  mainEl.appendChild(finalScorePage);
  finalScorePage.style.textAlign = "center";
  finalScorePage.style.padding = "50px";

  var allDone = document.createElement("h4"); 
  allDone.textContent = "All Done!";
  finalScorePage.appendChild(allDone);

  var scorePara = document.createElement("p"); 
  scorePara.textContent = "Your final score is " + score;
  finalScorePage.appendChild(scorePara);

  labelEl = document.createElement("label");
  labelEl.textContent = "Enter your initial";
  labelEl.style.margin = "15px";
  finalScorePage.appendChild(labelEl);

  inputEl = document.createElement("input"); 
  inputEl.setAttribute("class","initial")
  //inputEl.style.border = "thin solid black";
  finalScorePage.appendChild(inputEl);

  submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  
  finalScorePage.appendChild(submitButton);
  submitButton.style.backgroundColor = "green";
  submitButton.style.color = "white";
  submitButton.style.margin = "15px";

  // Added event listener to Submit button.
  submitButton.addEventListener("click", highScoreStore);
}



function hideAllSection(){
  if(nextSectionIndex === 0){
    var a = document.querySelector(".qone");
    a.style.display = "none";
  } else if (nextSectionIndex === 1){
    var a = document.querySelector(".qtwo");
    a.style.display = "none";
  } else if (nextSectionIndex === 2){
    var a = document.querySelector(".qthree");
    a.style.display = "none";
  } else if (nextSectionIndex === 3){
    var a = document.querySelector(".qfour");
    a.style.display = "none";
  } else if (nextSectionIndex === 4){
    var a = document.querySelector(".qfive");
    a.style.display = "none";
  }
}

// This function displays error message is user tries to save the score without entering initial
function highScoreStore() {
  //e.preventDefault();
  
  var initial = document.querySelector(".initial");
  var initialValue = initial.value;
  var errorMsg = document.createElement("p");
 
  if(initialValue === ""){ 
    errorMsg.textContent = "* Initial field can't be blank.";
    errorMsg.style.color = "red";
    var finalScorePage = document.querySelector(".final");
    finalScorePage.appendChild(errorMsg);
  } else if(initialValue !== "") {
      addStoredValue();
      //location.href = "highscore.html";
      getValueFromLocalStorage();
  } 
  
  // && ((initial.value).length === 2))
  // else {
  //   alert("Please enter only 2 letters initial.")
  // }
} 


function getValueFromLocalStorage(){
  var dataArray = JSON.parse(localStorage.getItem("quizResult"));
  

  if (dataArray !== null) {
    storedValues = dataArray;
    console.log(storedValues)
  }
  
}

// This function stores user input initial value and score to the local storage
function addStoredValue (){
  
  var storedObject = {
  initial: document.querySelector(".initial").value.toUpperCase(),
  scoreValue: score
  };
  
 
  storedValues.push(storedObject);


 //return storedValues;
 storeValuesToLocalStorage();
  //location.href = "highscore.html"; THIS WAS ORIGINALLY HERE BUT TRIED AT HIGHSCORESTORE FUNCTION. TAKE A LOOK AT IT LATER
} 

function storeValuesToLocalStorage(){
  localStorage.setItem("quizResult", JSON.stringify(storedValues));
  callHighscorePage();
}

function callHighscorePage(){
  location.href = "highscore.html";
}

