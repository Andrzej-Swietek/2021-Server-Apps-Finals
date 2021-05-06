const $ = (element,many=false) => {
    return (many)? document.querySelectorAll(element) : document.querySelector(element);
};
window.addEventListener('DOMContentLoaded', ()=>{
    const chatMessages = $('#messages');
    const input = $('#input');


    const socket = io();

// Message from server
    socket.on('chatMessage', (message) => {
        console.log(message);
        // Scroll down

        let messDiv = document.createElement('div');
        messDiv.classList.add("message-item");
        messDiv.innerText = message;
        chatMessages.append(messDiv)
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    input.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            // Do work
            socket.emit('chatMessage', input.value )
            input.value = ''
        }
    })

})
