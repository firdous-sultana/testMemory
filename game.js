alert("Test your memory with this game. Remember the sequence!");
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;


$(document).click(function(event){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    }, 200);
    $("level-title").text("Game Over, Click to Restart");
    startOver();
  }
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  // console.log(userClickedPattern);
});

function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
