var buttonEl = document.querySelector(".start");
var sectionEl = document.querySelector(".section");
var timeEl = document.querySelector(".time");
var mainEl = document.querySelector(".main");


var questionObj = [
    { question: "Inside which HTML element do we put the JavaScript?",
      answer: ["<script>", "<js>","<javascript>", "<scripting>"]},

    // { question: "Where is the correct place to insert a JavaScript?",
    //   answer: ["The <body> section", "The <head> section", "Both the <head> and the <body> section", "None of the Above"]},
    
    // { question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    //   answer: ["<script name = 'xxx.js'>", "<script href = 'xxx.js'>", "<scipt src = 'xxx.js'>", "<style src = 'xxx.js'>"]},
    
    // { question: "How do you write 'Hello World' in an alert box?",
    //   answer: ["alert('Hello World')", "msgBox('Hello World')", "alertBox('Hello World')", "msg('Hello World')"]},
    
    // { question: "How do you create a function in JavaScript?",
    //   answer: ["function:myFunction()", "function = myFunction()", "function myFunction()", "function myFunction"] }
  ];

var score = 0;
var timerInterval;
// Timer starts at 75 seconds at the beginning of the quiz.
var secondsLeft = 75;
timeEl.textContent = "Time: " + secondsLeft + " seconds";


buttonEl.addEventListener("click", function(){
    //sectionEl.textContent = "";
    sectionEl.style.display = "none";
    setTime();
    questionList();
});

// Timer function
function setTime() {
    timerInterval = setInterval(updateTimer, 1000);
}   
// Timer function
function updateTimer() {
  secondsLeft--;
  timeEl.textContent = "Time: " + secondsLeft + " seconds";
  if(secondsLeft === 0) {
    clearInterval(timerInterval);
  }
}


function questionList(){
     // another <section> tag created inside <main> tag
    var questionSectionEl = document.createElement("section");
    questionSectionEl.setAttribute("class","mySection");
    mainEl.appendChild(questionSectionEl);
    questionSectionEl.style.textAlign = "center";
    questionSectionEl.style.margin = "50px";

    for (var i = 0; i < questionObj.length; i++) {
        var questionEl = document.createElement("h4"); 
        questionEl.textContent = JSON.stringify(questionObj[i].question); 
        questionSectionEl.appendChild(questionEl);
        
        //<ol> tag created inside section
        var answerolEl = document.createElement("ol");
        answerolEl.setAttribute("class","ol");
        questionSectionEl.appendChild(answerolEl);

        for (var j = 0; j < 4; j++){
            var answerliEl = document.createElement("li"); 
            answerliEl.textContent = (questionObj[i].answer[j]);
            answerolEl.appendChild(answerliEl);
            questionSectionEl.style.textAlign = "left";
        }
        
        var hrEl = document.createElement("hr"); 
        questionSectionEl.appendChild(hrEl);

        answerResult(); 
    }
}



function answerResult(){
    var olEl = document.querySelector(".ol");
    olEl.addEventListener("click", checkAnswer);    
};


function checkAnswer(e){

    var selectedAnswer = e.target.textContent;  

    var secondSection = document.querySelector(".mySection");
    var answerCheckEl = document.createElement("h3"); 
    secondSection.appendChild(answerCheckEl);

    var questionAnswer = [
        { question: "Inside which HTML element do we put the JavaScript?",
          answer: "<script>"},
        
        { question: "Where is the correct place to insert a JavaScript?",
          answer: "The <body> section}"},
            
        { question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
          answer:  "<scipt src = 'xxx.js'>"},
            
        { question: "How do you write 'Hello World' in an alert box?",
          answer: "alert('Hello World')"},
            
        { question: "How do you create a function in JavaScript?",
          answer: "function myFunction()"}
    ];
    
    
        // Loop over every question object
        for (var i = 0; i < questionAnswer.length; i++) {
              // Compare answers
            
            if (selectedAnswer === questionAnswer[i].answer) {
                // Increase score
                score = score + 10;
                answerCheckEl.textContent = "Correct";
            } else {
                score = score - 10;
                secondsLeft = secondsLeft - 10;
                answerCheckEl.textContent = "Wrong";
            }
            questionList();
            
        }
}
    

