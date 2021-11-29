class Game{
    constructor(){
      this.gameOver=createElement('h1');
      this.ranks=createElement('h1');
    }
    //funcion para leer el estado del juego en la base de datos
    getState(){
      // .ref es el que se fija del valor que ahi en la base de datos
     var gameStateRef = database.ref('gameState');
     // .on se queda oyendo por algun cambio
     gameStateRef.on("value",function(data){
         //esta variable es igual al valor de gameState en la base de datos
         gameState = data.val();
     });
    }
    // funcion para actualizar el valor del gameState en la base de datos
    update(state){
      database.ref('/').update({
          gameState : state
      })
    }
    //funcion que empieza todo el juego
    async start(){
      //verifica si el estado del juego esta en cero permite ingresar un nuevo jugador
      if (gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        //Si hay un jugador se actualiza el conteo de jugadores
        if (playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        } 
        // crea y muestra nuevo formulario
        form = new Form();
        form.display();
      }  
       car1 = createSprite(100,500);
       car1.addImage(c1Img);
      car2 = createSprite(300,500);
      car2.addImage(c2Img);
      car3 = createSprite(500,500);
      car3.addImage(c3Img);
      car4 = createSprite(700,500);
      car4.addImage(c4Img);
      cars =[car1, car2, car3, car4]
    }
    // funcion para cuando el estado del juego cambia a 1
    play(){
      // Oculta el formulario
      form.hide();
      textSize(30);
      text("start",120,100);
      // obtiene todos los datos de los jugadores
      Player.getPlayerInfo();
      // obtine los datos de los jugadores que ya llegaron a la meta
      player.getCarsAtEnd();

      // verifica si hay jugadores listos
      if (allPlayers !== undefined){
        background(ground);
        //var display_position = 130;
        image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
        // saber que numero de jugador es 
        var index = 0;
        // guerda posiciones iniciales
        var x = -175;
        var y = undefined;
        // imprime a todos los jugadores
        for(var plr in allPlayers){
          // display_position +=20;
          // agrega 1 por cada vez que se repite el for
          index = index+1;
          // pone distancia entre los autos
          x = x+200;
          // coloca los autos en posicion y utilizando la distancia
          y = displayHeight-allPlayers[plr].distance;
          x = displayWidth-allPlayers[plr].move;
          // asigna las posiciones de cada auto dentro de la matriz
          cars[index-1].x = x;
          cars[index-1].y = y;
          // textSize(15);
          // text(allPlayers[plr].name+":"+allPlayers [plr].distance,120,display_position )
          // el jugador que es se pinte de rojo y la camara lo siga
          if (index === player.index ){
             cars[index-1].shapeColor ="red";
             camera.position.x = displayWidth/2;
             camera.position.y = cars[index-1].y;
             stroke(10);
             fill("red");
             ellipse(x,y,60,60);
          }
        }
      }
      // cuando se presiona la tecla de arriba el jugador avance
      if (keyDown("UP_ARROW")){
        player.distance +=50;
        player.update();
      }
      if (keyDown("LEFT_ARROW")){
        player.move +=50;
        player.update();
      }
      if (keyDown("RIGHT_ARROW")){
         player.move -=50;
         player.update();
      }
      if (player.distance === 3850 ){
        game.update(2);
        player.rank +=1;
        Player.updateCarsAtEnd(player.rank);
      }
      
      drawSprites();

    }
    end(){
      console.log("end");
      console.log(player.rank);
      this.gameOver.html("Game Over");
      this.gameOver.position(displayWidth/2-50,displayHeight/10);
      if(player.rank > player.rank){
        this.ranks.html("1st");
        this.ranks.position(displayWidth/2-50,displayHeight/5);
      }
    }
}
