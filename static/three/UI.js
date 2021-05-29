class UI extends HTMLElement{
    constructor() {
        super();
        this.player1Points = 0;
        this.player2Points = 0;

        this.classList.add('UI-panel-container');
        let player1 = document.createElement('div');
        let player2 = document.createElement('div');

        player1.innerHTML = `
<!--        <img src="https://image.ceneostatic.pl/data/products/81572858/i-avatar-the-last-airbender-awatar-legenda-aanga-box-13dvd.jpg"  alt="avatar"/>-->
        <img src="/img/p1.png"  alt="avatar"/>
        <h1> Player 1 </h1>
        <h2 id="player-1-points">${this.player1Points}</h2>
        `
        player2.innerHTML = `
<!--        <img src="https://image.ceneostatic.pl/data/products/81572858/i-avatar-the-last-airbender-awatar-legenda-aanga-box-13dvd.jpg"  alt="avatar"/>-->
        <img src="/img/p2.png"  alt="avatar"/>
        <h1> Player 2 </h1>
        <h2 id="player-2-points">${this.player2Points}</h2>
        `

        this.whoAmI = sessionStorage.getItem("gracz");
        if (this.whoAmI  == 1)
            player1.classList.add('me');
        else
            player2.classList.add('me');

        this.append(player1)
        this.append(player2)

        document.body.append(this)
    }

    updatePlayerPoints(p1,p2){
        this.player1Points = p1;
        this.player2Points = p2;
        this.$('#player-1-points').innerText = `${this.player1Points}`
        this.$('#player-2-points').innerText = `${this.player2Points}`

    }
    $(element){
        return document.querySelector(element)
    }

}
