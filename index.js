var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started =false;
var level = 0;//initialising the level

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

 $(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);//pushing the value to the array
    playSound(userChosenColour);
    animatePress(userChosenColour);
//calling checkAnswer after a user has choosen an answer
    checkAnswer(userClickedPattern.length-1);
 });

 function checkAnswer(currentLevel){
    //check if the answer is corrrect or worng
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
    //if the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
         }
        }
        else{
            console.log("wrong");
            //if the ans is wrong give this soud
            playSound("wrong");
    //when user get wrong as apply "game-over" class
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
        //give new heading after the ans is wrong
            $("#level-title").text("Game Over, Press any key to Restart");

            startOver();
        }
    }
function nextSequence(){
//Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern=[];
//for changing the text 
    level++;
    $("#level-title").text("Level"+level);
//randomising the selection of color
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
//for animate the box letter whenever that box is randomely choosren
    $( "#" + randomChosenColour ).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name+ ".mp3");//selecting audio with randomely choosen number
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");//your code to be executed after 1 second
      }, 100);
}

function startOver(){
//reset the values of level, gamePattern and started variables.

    level=0;
    gamePattern=[];
    started= false;
}

