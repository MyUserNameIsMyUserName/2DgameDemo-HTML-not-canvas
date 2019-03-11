 document.getElementById('all-opt').style.display = "none";
  var options = document.getElementById('all-opt');
    var player = document.getElementById('player');
var gun = document.getElementById('gun');
player.style.top = "175px";
player.style.left = "315px";
var topString;
var leftString;
var topPos;
var leftPos;
var tryFrame;
var currFrame;
var frameVAR;
var secondVAR;
var cursorX;
var cursorY;
var speed;
var isShooting;
var pointsa = new Array(4);
var pointsb = new Array(4);
var playerScore = 0;
var gameResolution;
var lastResolution;
var bulletsLeft = "5";
var muted = false;


function gameStart() {
      tryFrame = document.getElementById("fpsTRY").value;
      frameVAR = setInterval(oneFrame, 1000/tryFrame);
      secondVAR = setInterval(displayCurrentFps, 1000);
  changeRes();
}

function gameStop() {
      clearInterval(frameVAR);
      clearInterval(secondVAR);
  
}


function oneFrame() {
  movePlayer();  
    shootPlayer();
    checkShot();
  displayInfo();
  turnPlayer();
  currFrame++;
}



function displayCurrentFps() {
  document.getElementById("curFPS").innerHTML = "Current Fps: " + currFrame;
  currFrame = 0;
}

function fpsChange () {
  gameStop();
  gameStart();
  document.getElementById("fpsShow").innerHTML = document.getElementById("fpsTRY").value;
}






function turnPlayer(){
  topString = player.style.top;
  topPos = topString.slice(0, -2);
  leftString = player.style.left;
  leftPos = leftString.slice(0, -2);
  var rad = Math.atan2(cursorX - leftPos, cursorY - topPos);
  var rot = (rad * (180 / Math.PI) * -1);
  player.style.transform = 'rotate(' + rot + 'deg)';
}


document.getElementById('map').addEventListener("mousemove", function(event) {
    myFunction(event);
});

function myFunction(e) {
    cursorX = e.clientX - 10;
    cursorY = e.clientY - 10;
    
}

function displayInfo() {
  var coor = "Coordinates: (" + cursorX + "," + cursorY + ")";
    document.getElementById("coordinates").innerHTML = coor;
 
  document.getElementById("playerX").innerHTML = "X coordinate: " + leftPos;
  document.getElementById("playerY").innerHTML = "Y coordinate: " + topPos;
  document.getElementById("speedShow").innerHTML = document.getElementById("speedPlayer").value;
  
  document.getElementById("bulletsLeft").innerHTML = bulletsLeft;
    document.getElementById("mag").style.fontWeight = "500";
  
    document.getElementById("bulletsLeft").style.color = "green";
  if (bulletsLeft == 0) {
    document.getElementById("bulletsLeft").innerHTML = bulletsLeft + " <br>PRESS R TO RELOAD";
    document.getElementById("bulletsLeft").style.color = "red";
    document.getElementById("mag").style.fontWeight = "900";
    
  }
  
}




document.getElementById('map').addEventListener("mousedown", function(event) {
    click(event);
});

function click(e) {
  
   isShooting = 1;
  
}




document.getElementById('map').addEventListener("mouseup", function(event) {
    clickUp(event);
});

function clickUp(e) {
    isShooting = 0;
  
}


document.addEventListener("keydown", function(event) {
    keyFunc(event);
});

function keyFunc(e) {
    
  speed = document.getElementById("speedPlayer").value;
  speed = speed*gameResolution/10;
  
  if((event.keyCode == 87) && (topPos > (0 + speed))) {
        
        topPos = parseFloat(topPos) - parseFloat(speed);
    }
    else if((event.keyCode == 83) && (topPos < ( gameResolution*72 - speed)))  {

        topPos = parseFloat(topPos) + parseFloat(speed);
    }
    else if((event.keyCode == 65)  && (leftPos > (0 + speed))) {

        leftPos = parseFloat(leftPos) - parseFloat(speed);
    }
    else if((event.keyCode == 68) && (leftPos < ( gameResolution*128 - speed))) {
        
        leftPos = parseFloat(leftPos) + parseFloat(speed);
      
    } else if(event.keyCode == 192)  {
        
        if (options.style.display == "none") {
          options.style.display = "block";
          document.getElementById('map').style.visibility = "hidden";
        } else {
          options.style.display = "none";
          document.getElementById('map').style.cursor = "none";
          document.getElementById('map').style.visibility = "visible";
        }
        
      
    }
  
  if (event.keyCode == 82) {
    bulletsLeft = 5;
  }
    
};



function movePlayer(){ 
  
  player.style.left = leftPos + "px";
  player.style.top = topPos + "px";
  
};

document.addEventListener("load",gameStart());

function shootPlayer() {
  if ((isShooting == 1) && (bulletsLeft > 0)) {
    document.getElementById("gun").style.height = "2000px";
    document.getElementById("gun").style.botom = "2000px";  
  //setTimeout(function(){ document.getElementById("gun").style.height = "20px"; }, 50);
  if (muted > 0) {
    var shooting = new Audio('../game-demo2/sounds/sound_spark_Laser-Like_Synth_Dirty_Distorted_Laser_Oneshot_13.mp3');  
    shooting.volume = muted;
    shooting.play();
  }
    
    isShooting = 0;
    bulletsLeft--;
  } else {
    document.getElementById("gun").style.height = "0px"; 
  }
  
  
}



  function isUndefined(a) {
    return a === undefined;
}




function checkShot() {
  
/**
 * Helper function to determine whether there is an intersection between the two polygons described
 * by the lists of vertices. Uses the Separating Axis Theorem
 *
 * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @return true if there is any intersection between the 2 polygons, false otherwise
 */
var   pointsa = new Array(4),
        pointsb = new Array(4);
    
    
    
    
    
    
    
    $('#gun div').each(function(i) {
        pointsa[i] = {x: parseInt($(this).offset().left), y: parseInt($(this).offset().top)};
    });
    
    $('#enemy div').each(function(i) {
        pointsb[i] = {x: parseInt($(this).offset().left), y: parseInt($(this).offset().top)};
    });
    

  
  
    
    if (doPolygonsIntersect(pointsb, pointsa).toString() == "true") {
      $('.bodovi').css("background-color", "red");
    } else {
      $('.bodovi').css("background-color", "green");
    };
    
    //$('#detekcija').val("intersection: " + doPolygonsIntersect(pointsb, pointsa).toString());
    
  
    $('#playerScore').html(playerScore);
    
    
    
};


function doPolygonsIntersect (a, b) {
    var polygons = [a, b];
    var minA, maxA, projected, i, i1, j, minB, maxB;

    for (i = 0; i < polygons.length; i++) {

        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1++) {

            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % polygon.length;
            var p1 = polygon[i1];
            var p2 = polygon[i2];

            // find the line perpendicular to this edge
            var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

            minA = maxA = undefined;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            for (j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if (isUndefined(minA) || projected < minA) {
                    minA = projected;
                }
                if (isUndefined(maxA) || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = undefined;
            for (j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if (isUndefined(minB) || projected < minB) {
                    minB = projected;
                }
                if (isUndefined(maxB) || projected > maxB) {
                    maxB = projected;
                }
            }

            // if there is no overlap between the projects, the edge we are looking at separates the two
            // polygons, and we know there is no overlap
            if (maxA < minB || maxB < minA) {
                console.log("polygons don't intersect!");
                return false;
            }
        }
    }
    playerScore++; 
    if (muted > 0) {
var gotshot = new Audio('../game-demo2/sounds/sound_spark_Metal_Large_Sheet_Sledgehammer_Hit_16_441.mp3');
gotshot.volume = muted;
gotshot.play();
}
    return true;
};





function changeRes() {
    gameResolution = document.getElementById("gameRes").value;
  document.getElementById("resShow").innerHTML = gameResolution;
    player.style.width =  gameResolution*3 + "px";
    player.style.height =  gameResolution*3 + "px";
  $('head').append('<style>#player #gun {   display: block;  position: relative;  top: '+ gameResolution*1.5 +'px;  left: '+ gameResolution*1.45 +'px;  width: '+ gameResolution/5 +'px;  height: 0px;  background: #FF5500; } #player #gun:after {    content: "+";    font-size: '+ gameResolution*3 +'px;  color: red;  display: block;  position: relative;  z-index: 20;  top: '+ gameResolution*20 +'px;  right: '+ gameResolution*0.75 +'px;    } #player #gun:before {  content: " ";  width: '+ gameResolution*0.5 +'px;  height: '+ gameResolution*2.5 +'px;    display: block;  position: relative;  right: '+ gameResolution/5 +'px;  background: #000;  border-radius: 50% 50% 0 0;  } #enemy {  position: absolute;  width: '+ gameResolution*2 +'px;  height: '+ gameResolution*2 +'px;  top: '+ gameResolution*5 +'px;  left: '+ gameResolution*20 +'px;  background: red;}</style>');
  
  
  document.getElementById("map").style.width = gameResolution*128 + "px";
  document.getElementById("map").style.height = gameResolution*72 + "px";
  
  
  
  topString = player.style.top;
  topPos = topString.slice(0, -2);
  leftString = player.style.left;
  leftPos = leftString.slice(0, -2);
  
  /*
  if (lastResolution > gameResolution) {
    leftPos = (parseFloat(leftPos)/10)*gameResolution;
  player.style.left = leftPos + "px";
  topPos = (parseFloat(topPos)/10)*gameResolution;
  player.style.top =  topPos + "px";
  }*/
  
  topPos = (topPos/(lastResolution*128))*gameResolution*128;
  leftPos = (leftPos/(lastResolution*128))*gameResolution*128;
  
  
  var superLepi = gameResolution*42.5;
  //alert(superLepi);
  document.getElementById("all-opt").style.left = superLepi +"px";

  
  document.querySelector("#options p").style.fontSize = gameResolution + "px";
  document.querySelector(".fps p").style.fontSize = gameResolution + "px";
  document.querySelector(".playerSpeed p").style.fontSize = gameResolution + "px";
  document.querySelector("resolution p").style.fontSize = gameResolution + "px";
  document.querySelector(".soundSettings p").style.fontSize = gameResolution + "px";
  document.querySelector(".coordinatesMouse p").style.fontSize = gameResolution + "px";



  
  lastResolution = gameResolution;
};



function enableMute() { 
    muted = 0;
    document.getElementById('volume').value = 0;
} 

function disableMute() { 
    muted = 1;
    document.getElementById('volume').value = 100;
} 


function changeVolume() {
  muted = document.getElementById('volume').value/100;
}




var fullscreen = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (fullscreen.requestFullscreen) {
    fullscreen.requestFullscreen();
  } else if (fullscreen.mozRequestFullScreen) { /* Firefox */
    fullscreen.mozRequestFullScreen();
  } else if (fullscreen.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    fullscreen.webkitRequestFullscreen();
  } else if (fullscreen.msRequestFullscreen) { /* IE/Edge */
    fullscreen.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}


