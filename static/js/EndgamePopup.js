class EndgamePopup {
    constructor(container, winner) {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('bg')
        this.div = document.createElement('div');
        let h1 = document.createElement('h1');
        let h2 = document.createElement('h2');
        let button = document.createElement('button');

        this.div.classList.add('game-result-container');
        button.id = "popup-btn";

        h1.innerText = 'Game Over !!! ';
        h2.innerHTML = (winner !== 'Player 3')? `The winner is: <span> ${winner} </span>` : ' <span> Draw !!!</span>';
        button.innerText = 'Exit';


        this.div.append(h1);
        this.div.append(h2);
        this.div.append(button);

        this.container = container;

        this.div.addEventListener('click', (e)=>   e.target.focus())
        document.createElement('popup-btn').addEventListener('click', ()=> {
            sessionStorage.clear();
            console.log("XXX")
            location.reload();
        })
    }
    init(){
        this.container.append(this.overlay);
        this.container.append(this.div);
    }
}
