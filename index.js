var express = require('express');
var socket = require('socket.io');
const path = require('path')
const PORT = process.env.PORT || 5000
//App actualizacion.
var app = express();
var server = app.listen(PORT, function(){
    console.log('escuchar a petición del puerto 5000'); //conexion con el puerto
})

//Archivos estaticos.
app.use(express.static(path.join(__dirname, 'public'))); //Se conecta a la carpeta publica

//Actualizacion de conexiones
var io = socket(server);


io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
  });

io.on('connection',(socket) => {
    console.log('Hecho conexion genial.',socket.id) //Conexion con el socket
    // evento de cabezera
    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    });

});