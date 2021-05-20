class Board {
    constructor(scene) {
        this.scene = scene;
        this.board_player1 = new GLTFModel('models/board/board.gltf');
        this.board_player2 = new GLTFModel('models/board/board.gltf');
    }
    async init(){

        await this.board_player1.addToScene(this.scene);
        await this.board_player2.addToScene(this.scene);

    }

    setPosition(player,x=0,y=0,z=0){
        if (player === 1){
            this.board_player1.setPosition(x,y,z);
        }else if(player === 2) {
            this.board_player2.setPosition(x,y,z)
        }
    }
}
