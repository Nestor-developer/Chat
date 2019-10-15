//Construccion de la conexion
var socket = io();

//Query DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

// Emision de eventos
btn.addEventListener('click',function(){
    console.log(handle)
    console.log(handle.value)
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
});

// Listar los eventos
socket.on('chat',function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

// timeout variable
let timeout = false;

socket.on('typing',function(data){
    if(timeout != false){
        clearTimeout(timeout)
    }
    
    feedback.innerHTML = '<p><em>' + data + ' esta escribiendo un mensaje....</em></p>';

    timeout = setTimeout(() => {
        feedback.innerHTML = '';
    }, 1000)
});