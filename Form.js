class Form{
    constructor(){
      // crea el boton el cuadro y el mensaje de bienvenida y se pone this. para referise al objeto
      this.input = createInput("name");
      this.button = createButton("play");
      this.greeting = createElement('h3');
      this.button2 = createButton("reset");
     
    }
    // funcion para ocultar formulario
    hide(){
      this.greeting.hide();
      this.input.hide();
      this.button.hide();
    }
    // funcion para mostrar todo el formulario
    display(){
      // crea el titulo
      var title = createElement('h2');
      title.html("Juego de carreras");
      title.position(displayWidth /2-50,displayHeight/20);
     
     
      // Pone las posiciones
      this.input.position(displayWidth /2-40 ,displayHeight/2-200);
     
      this.button.position(displayWidth/2+30,displayHeight/2-100);

      this.button2.position(displayWidth-100,20);
      //funcion para todas las acciones cuando se presione el boton
      this.button.mousePressed(()=>{
        //se esconde el boton y el cuadro de nombre
         this.input.hide();
         this.button.hide();

         //guarda el nombre que el usuario introdujo
         player.name = this.input.value();
         playerCount+=1;
         
         // Acualiza el nombre y el conteo de jugadores en la base de datos
         player.index = playerCount;
         player.update();
         player.updateCount(playerCount);

         //pone el mensaje de bienvenida al usario 
         this.greeting.html("hola: " + player.name)
         this.greeting.position(displayWidth/2-70,displayHeight/4);
      })
      this.button2.mousePressed(()=>{
        player.updateCount(0);
        game.update(0);
      })
    }   
}