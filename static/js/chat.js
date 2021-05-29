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
        // let author = 'Andrzej';
        // let author = "Player " + sessionStorage.getItem("gracz");
        let author = message.author
        let messDiv = document.createElement('div');
        messDiv.classList.add("message-item");
        let isItMe = (message.author == ("Player " + sessionStorage.getItem("gracz")))? 'my-message':"other"
        messDiv.classList.add( isItMe );
        messDiv.innerHTML = `<h2>${message.text}</h2><h5>${author} | ${new Date().getHours()}:${new Date().getMinutes()}</h5>`;
        chatMessages.append(messDiv)
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    input.addEventListener('click', function(e){
        this.focus();
    })
    input.addEventListener("keyup", ({key}) => {
        if (key === "Enter" && input.value !== '') {
            // Do work
            let author = "Player " + sessionStorage.getItem("gracz");
            socket.emit('chatMessage', { author: author, text: input.value })
            input.value = ''
        }
    })

})
