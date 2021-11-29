
var database;
var gameState = 0;
var playerCount = 0;
var game, form, player;
var allPlayers;
var distance = 0;
var car1,car2,car3,car4;
var cars;
var c1Img,c2Img,c3Img,c4Img;
var ground,track;

function preload(){
  c1Img = loadImage("images/car1.png");
  c2Img = loadImage("images/car2.png");
  c3Img = loadImage("images/car3.png");
  c4Img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  track = loadImage("images/track.jpg");
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    // guarda en la variable la base de datos
    database = firebase.database();
    //crea un objeto de clase Game
    game = new Game();
    // Utiliza las funciones getState y start
    game.getState();
    game.start();
   
}

function draw(){
    background("#c68767");
    // cuando sean 4 jugadores gameState se ponga 1
   if(playerCount === 4){
     game.update(1);
   }
   // cuando gameState este en 1 se borre y se ponga la funcion play
   if(gameState === 1){
     clear();
     game.play();
   }
   if(gameState === 2){
      game.end();
   }
}


