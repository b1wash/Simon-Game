
////////////////////////My Solution///////////////////////////////////////////////////////////////////////////////


/// This is same as below code more simplified/////////////////////////////

// var buttonColours = ["red", "blue", "green", "yellow",];
// var randomChosenColour;
// function nextSequence() {
//   var randomNumber = Math.floor(Math.random()*buttonColours.length);
//   randomChosenColour = buttonColours[randomNumber]; // buttonColours[0] = red etc...
//   console.log(randomChosenColour);
//
//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//   var audio = new Audio("sounds/"+randomChosenColour+".mp3");
//   audio.play();
// }
// $(document).one("click", function() {
//   nextSequence();
// });

////////////////////////////////////////////My solution more extended with info from chatGpt/////////////////////////////////////////////////////////////////////



var buttonColours = ["red", "blue", "green", "yellow",];
var randomChosenColour;
var userClickedPattern = []; // Step 4 create an empty array
var level = 0;
var gamePattern = [];


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// Step 4

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});



// Steps 1,2,3




/// wrong code not running
// function nextSequence() {
//   var randomNumber = Math.floor(Math.random()*buttonColours.length); // random number into 0 and 4, 4 isnt included. We use math.floor to round a nearest number.
//   randomChosenColour = buttonColours[randomNumber]; // buttonColours[0] = red etc...
//   console.log(randomChosenColour);
//
//   var buttonID = "#" + randomChosenColour;
//   var button = $(buttonID); // after we create a variable, in this line of code wee are selecting the button with the $ sign jQuery.
//
//   button.fadeIn(100).fadeOut(100).fadeIn(100); // animate with a flash to the button selected
//
//
//   // var soundFile = soundFiles[randomChosenColour]; // In this case, randomChosenColour is a variable holding a string value representing the color name. So, we use the variable name without quotes to access the value of the corresponding property in the soundFiles object. If we use quotes, it would look for a property with the name "randomChosenColour" instead of using the value held by the variable.
//   // var audio = new Audio(soundFile);
//   // audio.play();
//
//   level ++;
//   $("#level-title").text("Level " + level);
// }

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



// Step 6
function animatePress(currentColour){
$("#" + currentColour).addClass("pressed"); // currentColour is equal to userCholenColour what means the button id that is selected.
setTimeout(function() { // The setTimeout() function is used to delay the execution of a code block by a specified amount of time.
   $("#" + currentColour).removeClass("pressed");
 }, 100);
}


// Step 7
var gameStarted = false;
$(document).keydown(function() { // this line of codes means when we click the button then it runs the function with parameter nextSequence()

  if (!gameStarted) { // (!gameStarted) is same as (gameStarted === false).
    nextSequence();
    gameStarted = true;
    $("#level-title").text("Level " + level);
  }
});

// Step 8

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { // When the games starts in th level 1 for example the gamePattern randomly is "red" so that means gamePattern[currentLevel] is 0 because userClickedPattern.length - 1 and same when the user clicks on the correct answer in this case the color red and it will be userClickedPattern[currentLevel] 0 too.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Reset game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}

// Start game on key press
$(document).keypress(function() {
  if (!gameStarted) { // !gameStarted means === false so thats is true, thats wwhy it runs and gameStarted change's  = true, and also call the nextSequence();
    gameStarted = true;
    nextSequence();
  }
});
