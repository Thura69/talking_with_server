const url = "ws://localhost:8887";

const server = new WebSocket(url);




const message = document.getElementById('messages');
const input = document.getElementById('message');
const button = document.getElementById('send');



button.disabled = true;

button.addEventListener('click', sendMessage);



server.onopen = function () {
    button.disabled = false;
}
 
server.onmessage = function (event) {
    const { data } = event;
   
    generateMessage(data,"server")
}

function sendMessage() {
    const text = input.value;
     generateMessage(text,"client")
    server.send(text);
    input.value = "";
}

function generateMessage(data,type) {
    const newMessage = document.createElement('div');
    newMessage.innerText = `${type}:` + `${data }`;
    message.appendChild(newMessage);

}