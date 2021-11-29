class Player{
    constructor(){
      //crea index, el nombre y la distancia
      this.name = null;
      this.distance = 0;
      this.index = null;
      this.rank = null;
      this.move = 0;
    }
    // funcion para ver cuantos jugadores hay en la base de datos
    getCount(){
       var playerCountRef = database.ref('playerCount');
       playerCountRef.on("value",function(data){
        playerCount = data.val();
    });
     }
     // Actualiza el conteo de jugadores
    updateCount(count){
        database.ref('/').update({
            playerCount : count
        })
    }
    // Actualiza el nombre de usuario
    update(name){
      var playerIndex = "players/player"+ this.index;
      
      database.ref(playerIndex).set({
         name:this.name,
         distance:this.distance, 
         move : this.move
      })
    }
    // funcion estatica para obtener la informacion de los jugadores
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    });
    }
    //obtienen la cantidad de autos que llegaron a la meta
    getCarsAtEnd(){
     database.ref('carsAtEnd').on("value",(data)=>{
       this.rank = data.val();
     })
    }
    //actualizar lugar en que los autos llegan a la meta
    static updateCarsAtEnd(rank){
      database.ref('/').update({
        carsAtEnd : rank
    })
    }
}