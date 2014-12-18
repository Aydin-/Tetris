// Tetris game v0.01
// aydingungordu.com

Array.matrix = function (m, n, initial) {
  var a, i, j, mat = [];
  for (i = 0; i < m; i += 1) {
    a = [];
    for (j = 0; j < n; j += 1) {
      a[j] = initial;
    }
    mat[i] = a; }
  return mat;
};

var GameObject = function(id,type) {
  this.x=1;
  this.y=1;
  this.r = getRandomInt(85,245);
  this.g = getRandomInt(85,245);
  this.b = getRandomInt(85,245);
  this.id = id;
  this.type=type;
  this.states = [];
  this.state = 0;
};

var TETRIS=null;
var go = null;

function initTetris(){
   TETRIS = {
     brushWidth: 40,
     rowCount: 20,
     colCount: 10,
     center: 3,
     interval: setInterval(function () {
       if (!TETRIS.gameOver)
         moveDown();
     }, 300),
     myMatrix: Array.matrix(11, 21, 0),
     gid: 1,
     lineCount: 0,
     colorMap: ["rgb(46,46,46)"],
     level: 1,
     ctx: null,
     gameOver: false,
     TypeEnum: {
       BLOCK: "block",
       STRAIGHT: "straight",
       SNAKE: "snake",
       HOOKLEFT: "hookleft",
       HOOKRIGHT: "hookright",
       PYRAMID: "pyramid",
       X: "x",
       Y: "y"
     }
   };

  go = createObject(TETRIS.gid);

  TETRIS.ctx=document.getElementById("myCanvas").getContext("2d");
  drawScore();
}

function makeStraightObject(id) {
  var obj = new GameObject(id, TETRIS.TypeEnum.STRAIGHT);
  var coords = [];
  storeCoordinate(1, 0, coords);
  storeCoordinate(1, 1, coords);
  storeCoordinate(1, 2, coords);
  storeCoordinate(1, 3, coords);

  obj.states.push(coords);
  coords=[];

  storeCoordinate(0, 2, coords);
  storeCoordinate(1, 2, coords);
  storeCoordinate(2, 2, coords);
  storeCoordinate(3, 2, coords);
  obj.states.push(coords);

  return obj;
}

function makeHookLeftObject(id) {
  var obj = new GameObject(id, TETRIS.TypeEnum.HOOKLEFT);
  var coords = [];
  storeCoordinate(0, 0, coords);
  storeCoordinate(1, 0, coords);
  storeCoordinate(1, 1, coords);
  storeCoordinate(1, 2, coords);
  obj.states.push(coords);

  coords = [];
  storeCoordinate(0, 1, coords);
  storeCoordinate(1, 1, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(0, 2, coords);
  obj.states.push(coords);

  coords = [];
  storeCoordinate(0, 0, coords);
  storeCoordinate(0, 1, coords);
  storeCoordinate(0, 2, coords);
  storeCoordinate(1, 2, coords);
  obj.states.push(coords);

  coords = [];
  storeCoordinate(0, 1, coords);
  storeCoordinate(1, 1, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(2, 0, coords);
  obj.states.push(coords);

  return obj;
}

function makeHookRightObject(id) {
  var obj = new GameObject(id, TETRIS.TypeEnum.HOOKRIGHT);
  var coords = [];
  storeCoordinate(1, 0, coords);
  storeCoordinate(0, 0, coords);
  storeCoordinate(0, 1, coords);
  storeCoordinate(0, 2, coords);
  obj.states.push(coords);

  coords = [];
  storeCoordinate(0, 1, coords);
  storeCoordinate(1, 1, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(2, 2, coords);
  obj.states.push(coords);

  coords = [];
  storeCoordinate(1, 0, coords);
  storeCoordinate(1, 1, coords);
  storeCoordinate(1, 2, coords);
  storeCoordinate(0, 2, coords);
  obj.states.push(coords);

  coords = [];
  storeCoordinate(0, 1, coords);
  storeCoordinate(1, 1, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(0, 0, coords);
  obj.states.push(coords);

  return obj;
}

function makePyramidObject(id) {
  var obj = new GameObject(id, TETRIS.TypeEnum.PYRAMID);
  var coords = [];
  storeCoordinate(1, 1, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(3, 1, coords);
  storeCoordinate(2, 0, coords);
  obj.states.push(coords);
  coords = [];

  storeCoordinate(2, 0, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(2, 2, coords);
  storeCoordinate(1, 1, coords);
  obj.states.push(coords);
  coords = [];

  storeCoordinate(1, 1, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(3, 1, coords);
  storeCoordinate(2, 2, coords);
  obj.states.push(coords);
  coords = [];

  storeCoordinate(2, 0, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(2, 2, coords);
  storeCoordinate(3, 1, coords);
  obj.states.push(coords);

  obj.coords = obj.states[obj.state];

  return obj;
}

function makeSnakeObject(id) {
  var obj = new GameObject(id, TETRIS.TypeEnum.SNAKE);
  var coords = [];
  storeCoordinate(1, 1, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(2, 2, coords);
  storeCoordinate(3, 2, coords);
  obj.states.push(coords);
  coords=[];
  storeCoordinate(2, 1, coords);
  storeCoordinate(1, 2, coords);
  storeCoordinate(2, 2, coords);
  storeCoordinate(1, 3, coords);
  obj.states.push(coords);

  obj.coords=obj.states[obj.state];

  return obj;
}

function makeBlockObject(id) {
  var obj = new GameObject(id, TETRIS.TypeEnum.BLOCK);
  var coords = [];
  storeCoordinate(1, 1, coords);
  storeCoordinate(1, 2, coords);
  storeCoordinate(2, 1, coords);
  storeCoordinate(2, 2, coords);
  obj.states.push(coords);

  obj.coords=obj.states[obj.state];

  return obj;
}

function createObject(id) {
  var random = getRandomInt(0,6);
  var retval = null;

  if(random === 0)
    retval =makeStraightObject(id);
  else if(random === 1)
    retval = makePyramidObject(id);
  else if(random === 2)
    retval = makeSnakeObject(id);
  else if(random === 3)
    retval = makeBlockObject(id);
  else if(random === 4)
    retval = makeHookLeftObject(id);
  else if(random === 5)
    retval = makeHookRightObject(id);
  else
    retval = makeStraightObject(id);

  return retval;
}

function storeCoordinate(xVal, yVal, array) {
  array.push({x: xVal + TETRIS.center, y: yVal});
}

window.addEventListener("keypress", function (e) {
  if(e.which === 100) {
    moveRight();
  } else if (e.which === 97) {
    moveLeft();
  } else if(e.which === 119) {
    rotate();
  } else if(e.which === 115) {
    moveDown();
  } else if(e.which === 13) {
    var goId=go.id;
    while(canMoveDown() && goId === go.id) {
     moveDown();
    }
  }
});

function moveDown(){
  if(canMoveDown()) {
    clearObject();
    //update all states
    for(var i = 0; i < go.states.length; i++) {
      for (j = go.states[i].length - 1; j >= 0; j--) {
        go.states[i][j].y++;
      }
    }
    //update matrix
    for(var i = 0; i < go.states[go.state].length; i++) {
      TETRIS.myMatrix[go.states[go.state][i].x][go.states[go.state][i].y]=go.id;
    }

    drawObject();
  } else {

    for(var i = 0; i < go.states[go.state].length; i++) {
      if (go.states[go.state][i].y < 1) {
        alert("Game over");
        i = go.states[go.state].length;
        TETRIS.gameOver = true;
        //drawObject();
      }
    }

    if(!TETRIS.gameOver) {
      var yArray=getCoordinatesAsArray(TETRIS.TypeEnum.Y)
      TETRIS.colorMap[go.id]="rgb("+go.r+","+go.g+","+go.b+")";
      trimCompleteRows(Math.min.apply(Math,yArray), Math.max.apply(Math,yArray));
      TETRIS.gid++;
      go = createObject(TETRIS.gid);
    }
  }
}

function rotate(){
  if(go.type === TETRIS.TypeEnum.BLOCK)
    return;

  var oldState = go.state;
  clearObject();

  go.state++;
  go.state = (go.state % go.states.length);

  var xArray = getCoordinatesAsArray(TETRIS.TypeEnum.X);

  if(Math.min.apply(Math,xArray)<0 || Math.max.apply(Math,xArray)>TETRIS.colCount-1)
    go.state=oldState; // cannot rotate here

  drawObject();
}

function moveRight() {
  if(!canMoveRight())
    return;

  clearObject();
  for(var i = 0; i < go.states.length; i++) {
    for (var j = 0; j < go.states[i].length; j++) {
      go.states[i][j].x++;
    }
  }

  for(var i=0; i<go.states[go.state].length; i++) {
    TETRIS.myMatrix[go.states[go.state][i].x][go.states[go.state][i].y]=go.id;
  }
  drawObject();
}

function moveLeft() {
  if(!canMoveLeft())
    return;

  clearObject();
  for(var i = 0; i<go.states.length; i++) {
    for (var j = 0; j < go.states[i].length; j++) {
      go.states[i][j].x--;
    }
  }

  for(i = 0; i<go.states[go.state].length; i++) {
    TETRIS.myMatrix[go.states[go.state][i].x][go.states[go.state][i].y]=go.id;
  }

  drawObject();

}

function clearObject() {
  if(TETRIS.ctx !== null) {
    TETRIS.ctx.fillStyle = TETRIS.colorMap[0];
    for (var i = 0; i < go.states[go.state].length; i++) {
      var x = go.states[go.state][i].x;
      var y = go.states[go.state][i].y;
      TETRIS.myMatrix[x][y]=0;
      TETRIS.ctx.fillRect(x * TETRIS.brushWidth ,y * TETRIS.brushWidth, TETRIS.brushWidth, TETRIS.brushWidth);
      TETRIS.ctx.stroke();
    }
  }
}

function drawObject() {
  TETRIS.ctx.fillStyle = "rgb("+go.r+","+go.g+","+go.b+")";
  for (var i = 0; i < go.states[go.state].length; i++) {
    var x = go.states[go.state][i].x;
    var y = go.states[go.state][i].y;
    TETRIS.ctx.fillRect(x * TETRIS.brushWidth ,y * TETRIS.brushWidth, TETRIS.brushWidth, TETRIS.brushWidth);
    TETRIS.ctx.stroke();
  }
}

function canMoveDown() {
  for (var i = 0; i < go.states[go.state].length; i++) {
    var x = go.states[go.state][i].x;
    var y = go.states[go.state][i].y;

    if(y >= TETRIS.rowCount) {
      return false;
    }

    if(TETRIS.myMatrix[x][y+1] !== 0 && TETRIS.myMatrix[x][y+1] !== go.id)
      return false;
  }

  return true;
}

function canMoveLeft() {

  for (var i = 0; i < go.states[go.state].length; i++) {
    var x = go.states[go.state][i].x;
    var y = go.states[go.state][i].y;

    if(x < 1) {
      return false;
    }

    if(TETRIS.myMatrix[x-1][y] !== 0 && TETRIS.myMatrix[x-1][y] !== go.id) {
      return false;
    }
  }
  return true;
}

function canMoveRight() {
  for (var i = 0; i <go.states[go.state].length; i++) {
    var x = go.states[go.state][i].x;
    var y = go.states[go.state][i].y;

    if(x >= TETRIS.colCount-1) {
      return false;
    }

    if(TETRIS.myMatrix[x+1][y] !== 0 && TETRIS.myMatrix[x+1][y] !== go.id)
      return false;
    }
    return true;
  }

function trimCompleteRows(minY, maxY){
  TETRIS.ctx.fillStyle = "rgb(255,255,255)";

  for (var j = maxY; j >= minY; j--) { //start from lower row
    var rowComplete = true;
    for (var i = 0; i < TETRIS.colCount; i++) { // check all columns on row for a zero
      if(TETRIS.myMatrix[i][j] === 0) {
        rowComplete=false;
        break;
      }
    }
    if(rowComplete) {
      TETRIS.lineCount++;

      for(var i = 0; i < TETRIS.colCount; i++) {
          TETRIS.myMatrix[i][j]=0;

          TETRIS.ctx.fillRect(i * TETRIS.brushWidth ,j * TETRIS.brushWidth, TETRIS.brushWidth, TETRIS.brushWidth);
          TETRIS.ctx.stroke();
      }

      for(var h = j-1; h > 0; h--) {
          for(i=0; i<TETRIS.colCount; i++) {
            TETRIS.myMatrix[i][j]=TETRIS.myMatrix[i][h];
            TETRIS.ctx.fillStyle=TETRIS.colorMap[TETRIS.myMatrix[i][h]];
            TETRIS.ctx.fillRect(i * TETRIS.brushWidth ,j * TETRIS.brushWidth, TETRIS.brushWidth, TETRIS.brushWidth);
            TETRIS.ctx.stroke();
          }
          j--;
        }


      if(TETRIS.lineCount%3 === 0) { // level up
        TETRIS.level++;
        clearInterval(TETRIS.interval);
        TETRIS.interval = setInterval(function(){
          if(!TETRIS.gameOver)
            moveDown();
        }, 300 - (TETRIS.level * 30));
      }

      clearScore();
      drawScore();

      trimCompleteRows(minY, maxY);
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function clearScore(){
  TETRIS.ctx.fillStyle = TETRIS.colorMap[0];
  TETRIS.ctx.fillRect(250 ,2, 150, 30);
  TETRIS.ctx.stroke();
}

function drawScore(){
  TETRIS.ctx.fillStyle ="rgb(255,255,255)";
  TETRIS.ctx.font = "16px Georgia";
  TETRIS.ctx.fillText("Level: "+TETRIS.level+" - Lines: "+TETRIS.lineCount, 250, 15);
}

function getCoordinatesAsArray(axis){
  var retval = [];
  for (var i = 0; i < go.states[go.state].length; i++) {
    if(axis === TETRIS.TypeEnum.X) {
      retval.push(go.states[go.state][i].x)
    } else if(axis === TETRIS.TypeEnum.Y) {
      retval.push(go.states[go.state][i].y)
    }
  }
  return retval;
}