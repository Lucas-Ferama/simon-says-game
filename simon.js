const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let started = false;
let userClickedPattern = [];
let level = 0;

// Functions 
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * buttonColors.length);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Animate button
    $("#" + randomChosenColor)
        .animate({ opacity: 0 }, 200)
        .animate({ opacity: 1 }, 200);
    //Play sound
    playSound(randomChosenColor);
    userClickedPattern = [];
}

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Event Listeners 

// Start game on keydown
$(document).keydown(function () {
    if (!started) {
       nextSequence();
        started = true;
    }
});

// Animate button press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

// Handle user button clicks
buttonColors.forEach(function (color) {
    document.getElementById(color).addEventListener("click", function () {
        userClickedPattern.push(color);
        playSound(color);
        animatePress(color);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            $("h1").text("Well Done!");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}