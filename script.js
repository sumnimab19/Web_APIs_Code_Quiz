var buttonEl = document.querySelector(".start");
var sectionEl = document.querySelector(".section");
var timeEl = document.querySelector(".time");
var mainEl = document.querySelector(".main");

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

     // another <section> tag created inside <main> tag
    var questionSectionEl = document.createElement("section");
    mainEl.appendChild(questionSectionEl);
    questionSectionEl.style.textAlign = "center";
    questionSectionEl.style.margin = "50px";

    
    

    for (var i = 0; i < questionObj.length; i++) {
        var questionEl = document.createElement("h4"); 
        questionEl.textContent = JSON.stringify(questionObj[i].question); 
        questionSectionEl.appendChild(questionEl);
        

        //<ul> tag created inside section
        var answerulEl = document.createElement("ul");
        questionSectionEl.appendChild(answerulEl);

        
        for (var j = 0; j < 4; j++){
            var answerliEl = document.createElement("li"); 
        
        answerliEl.textContent = (questionObj[i].answer[j]);
        console.log(answerliEl)
        answerulEl.appendChild(answerliEl);
        questionSectionEl.style.textAlign = "center";
        }

        


  }
}

