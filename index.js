var express = require('express');
var socket = require('socket.io');

//App actualizacion.
var app = express();
var server = app.listen(4000,function(){
    console.log('escuchar a petición del puerto 4000'); //conexion con el puerto
});

//Archivos estaticos.
app.use(express.static('public')); //Se conecta a la carpeta publica

//Actualizacion de conexiones
var io = socket(server);

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