const socket = io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messagein');
const messagecon = document.getElementById('contain');


// creating div for msg chat
const append = (message, position) => {

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    messagecon.append(messageElement);


}



const name = prompt("enter your name");
socket.emit('new-user-joined', name);

socket.on('res', name => {
    console.log("joined event recv");
    append(` ${name.name}: joined the chat `, 'center')
});

// receive msg
socket.on('receive', data => {
    console.log("joined event recv");
    append(` ${data.name} ${data.message} `, 'left')
});

// left chat disconnection
socket.on('left', name=>{

    append(` ${name }:left the chat`,'center')



});


// for send msg
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value='';
    



})