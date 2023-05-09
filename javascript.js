/*eslint-env browser*/
var playing = false;
var score, action, timeremaining;
var correctAnswer
//if we click on start/reset button
  document.getElementById("startreset").onclick = function () {
 //if we are playing
  if (playing === true) {
    //reload the page
    location.reload();
  }
  // if we are not playing
  else {
    // change mode to playing
    playing = true;
    //set score to zero
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    //show countdown box
    show("timeremaining");
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    
    hide("gameover");
    
    //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game"
    // start countdown
    startCountDown();
    generateQA();
    }
  };

  for(var i = 1; i < 5; i++){
    document.getElementById("box"+i).onclick = function(){
    if(playing == true){
      // or we can use document.getElementById("box1") instead of this
      if(this.innerHTML == correctAnswer) {
        score += 1;
        document.getElementById("scorevalue").innerHTML = score;
        hide("wrong");
        show("correct");
        setTimeout(function(){
          hide("correct");
        }, 1000);
        
        generateQA();
        
      }else{
        hide("correct");
        show("wrong");
        setTimeout(function(){
          hide("wrong");
        }, 1000);
      }
    }
  }
  }

// if we click on answer box
//      if we are playing
//          correct?
//            yes ? 
//              increase score by 1
//              show correct box for a sec
//              generate new questions and multiple answers
//            no ?
//               show try again box for a sec

function startCountDown(){
  action = setInterval(function(){
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if(timeremaining == 0){
      // game over
      stopCountDown();
      show("gameover");
      document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + "</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

function stopCountDown(){
  clearInterval(action);
}

function hide(id){
  document.getElementById(id).style.display = "none";
}

function show(id){
  document.getElementById(id).style.display = "block";
}

function generateQA(){
  var x = 1 + Math.round(99 * Math.random());
  var y = 1 + Math.round(99 * Math.random());
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "x" + y;
  var correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
  var answer = [correctAnswer];
  for(var i = 1; i < 5; i++){
    if(i !== correctPosition){
      var wrongAnswer;
      do{
        wrongAnswer = (1 + Math.round(99 * Math.random())) * (1 + Math.round(99 * Math.random()));
      }while(answer.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answer.push(wrongAnswer);
    }
  }
}