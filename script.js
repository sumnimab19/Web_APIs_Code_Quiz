var buttonEl = document.querySelector(".btn");
var sectionEl = document.querySelector(".section");
var timeEl = document.querySelector(".time");

var timerInterval;
var secondsLeft = 75;
timeEl.textContent = "Time: " + secondsLeft;


buttonEl.addEventListener("click", function(e){
    console.log("Button Clicked");
    console.log(sectionEl)
    sectionEl.textContent = "";
    //questionList();
    setTime();

});

function setTime() {
    timerInterval = setInterval(updateTimer, 1000);
}   

function updateTimer() {
  secondsLeft--;
  timeEl.textContent = "Time: " + secondsLeft;
  console.log(timeEl)

  if(secondsLeft === 0) {
    clearInterval(timerInterval);
    
  }
}


