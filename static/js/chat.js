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
        let author = 'Andrzej';
        let messDiv = document.createElement('div');
        messDiv.classList.add("message-item");
        messDiv.innerHTML = `<h2>${message}</h2><h5>${author} | ${new Date().getHours()}:${new Date().getMinutes()}</h5>`;
        chatMessages.append(messDiv)
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    input.addEventListener("keyup", ({key}) => {
        if (key === "Enter" && input.value !== '') {
            // Do work
            socket.emit('chatMessage', input.value )
            input.value = ''
        }
    })

})
