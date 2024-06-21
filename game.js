const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
userClickedPattern = [];

let started = false;
let level = 0;

function updateTitle() {
  if (window.innerWidth < 570) {
    // You can adjust the width as needed
    $("#level-title").text("Press here to start");
    $("#level-title").click(function () {
      if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
    });
  } else {
    $("#level-title").text("Press any key to start");
  }
}

// Initial title update
updateTitle();

// Update title on resize
$(window).resize(function () {
  updateTitle();
});

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (event) {
  let userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    if (innerWidth < 570) {
      $("#level-title").text("Game Over, Press Here to Restart");
    }

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
