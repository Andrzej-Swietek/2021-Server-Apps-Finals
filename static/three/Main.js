class Main {
    constructor(container) {
        // właściwości klasy
        this.container = container;
        this.scene = new THREE.Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        // this.stone1.moveTo(-5,0,-5);

        this.stone2 = new Cube(this.scene);
        this.stone2.moveTo(5,0,5)

        const socket = new io();
        new RaycasterHandler(this.scene,this.camera.threeCamera, socket)

        // LIGHTS

        this.backLight = new THREE.DirectionalLight(0xffffff, 1.0);
        this.backLight.position.set(100, 0, -100).normalize();

        this.keyLight = new Light('DIRECTIONAL',new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
        this.keyLight.setLightPosition(-100,0,100);

        this.fillLight = new Light('DIRECTIONAL',new THREE.Color('hsl(240, 100%, 75%)'),0.75);
        this.fillLight.setLightPosition(100, 0, 100);

        this.l = new Light('DIRECTIONAL',0xffffff)
        this.l.setLightPosition(0,1,0);
        this.scene.add(this.l.getLight())

        this.scene.add(this.keyLight.getLight());
        this.scene.add(this.fillLight.getLight());
        this.scene.add(this.backLight);

        this.skybox = new Skybox(this.scene);
        this.skybox.moveTo(0,0,0)

        this.gridHelper = new THREE.GridHelper(10, 10);
        this.scene.add(this.gridHelper);




        this.controls = new THREE.OrbitControls(this.camera.threeCamera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.autoRotate = true;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 50;




        // this.ws = new WebsocketHandler('localhost:3000');
        if (!window.customElements.get('ui-element'))
            window.customElements.define('ui-element', UI);

        this.ui = new UI();


        //prośba do serwera o numer planszy i gracza
        socket.emit('getNum');

        socket.on('message', message=>{
            console.log(message)
            console.log(message.holes)
            this.ui.updatePlayerPoints(message.player1 || 0, message.player2 || 0)
        });

        //otrzymanie numeru gracza oraz numeru planszy
        socket.on('playerNum', playerNum=>{
            if(sessionStorage.length==0){
                console.log('gracz'+playerNum[0],'plansza'+playerNum[1])
                sessionStorage.setItem('gracz',playerNum[0])
                sessionStorage.setItem('plansza',playerNum[1])

                this.ui.setFrame()
            }
            else{
                socket.emit('getPos',{'board':sessionStorage['plansza']});
                socket.emit('nextPlayer',{'player':sessionStorage['gracz'],'board':sessionStorage['plansza']});
            }
        });

        socket.on('enemyMoveSend', message => {
            if(message['board'] == sessionStorage['plansza']){
                if(message['player'] == sessionStorage['gracz']){
                    this.deleteGlows()
                    // TODO: kropki tur
                }
            }
            if(message['board'] == sessionStorage['plansza']){
                if(message['player'] != sessionStorage['gracz']){
                    console.log('ruch przeciwnika')
                    // TODO: kropki tur
                }
            }
        })

        socket.on('endgame', message=>{
            console.log(`%c  WINNER ${ message.winner }`);
            // let fireworks = new Fireworks()
            this.endgamePopup = new EndgamePopup(document.body,`Player ${message.winner}`);
            this.endgamePopup.init();
            sessionStorage.clear();
        })
        // this.endgamePopup = new EndgamePopup(document.body,`Player ${2}`);
        // this.endgamePopup.init();
        // ruch gracza
        // for(let q=1;q<13;q++){
        //     document.getElementById(q).addEventListener('click',function(){
        //         socket.emit('playerMover',{'board':sessionStorage['plansza'],'player':sessionStorage['gracz'],'doc':this.id})
        //         console.log(this.id)
        //     })
        // }

        //zmiana tury
        document.getElementById('turn').addEventListener('click',function(){
            socket.emit('nextPlayer',{'player':sessionStorage['gracz'],'board':sessionStorage['plansza']})
        })

        // socket.emit('playerMover', {"hole1": 4, "hole3": 4,"hole4": 4,"hole5": 4,"hole6": 4,"hole7": 4,"hole8": 4,"hole9": 4,"hole10": 4} );

        socket.on('yourTurn',message=>{
            if(message['tura'] == sessionStorage['gracz'] && message['board'] == sessionStorage['plansza']){
                this.addLightGlows(message['tura'],socket)
            }

        })

        socket.on('ballsPos', message=>{
            this.ballsPositions = [];
            this.ballsPositions = message['holes'];
            console.log('ballsPos');
            console.log(message['holes']);
        })
    }
    async objectSetup(){
        this.duck = new GLTFModel('models/duck/duck.gltf'); // TODO: docelowo jako jedno pole classy np planszy
        await this.duck.addToScene(this.scene);
        this.duck.model.position.set(-6,-1,-6)

        this.rock_model = new Rock('models/rock/rock.dae')
        this.rock_model.addToScene(this.scene,-10,-3,-10)


        this.fontanna = new Fontain()
        await this.fontanna.addToScene(this.scene,0,0,0,-Math.PI/2,0,0);
        this.fontanna.test_log()
        this.fontanna.setPosition(-8,-1,8)
        this.fontanna.setModelScale(.2,.2, .05)

        this.skala2 = new DaeModel('models/skala2/skala2.dae','models/skala2/skala2/material_3.jpg')
        await this.skala2.addToScene(this.scene)
        this.skala2.setPosition(15,-3,5)
        this.skala2.rotate(-Math.PI/2, 0,-Math.PI)

        this.board = new Board(this.scene)
        await this.board.init()
        this.board.setPosition(1, 0,0,-1);
        this.board.setPosition(2, 0,0,1);


        if(this.ballsPositions == null){
            this.stones = [];
            for (let i=0; i< 12; i++){
                for (let j = 0; j < 4 ; j++){
                    let game_piece = new Stone(this.scene,{ name:"stone", id: (j*4)+i })
                    game_piece.setPosition(
                        game_piece.positionToHole( i )[ j%4 ].x,
                        game_piece.positionToHole( i )[ j%4 ].y,
                        game_piece.positionToHole( i )[ j%4 ].z
                    )
                    game_piece.userData["hole"] = i;
                    this.stones.push(game_piece);
                }

            }
        }
        else{
            //blah blah
            console.log('nulllllllllllllllllllllllllllllllllllllllllllllll')
            console.log(this.ballsPositions)
            this.stones = [];
            for (let i=0; i< 12; i++){
                for (let j = 0; j < this.ballsPositions['hole'+i] ; j++){
                    let game_piece = new Stone(this.scene,{ name:"stone", id: (j*4)+i })
                    let height = 0;
                    if(j>=4 && j<8){
                        height = 0.5
                    }
                    else if(j>=8 && j<12){
                        height = 1
                    }
                    else if(j>=12){
                        height = 1.5
                    }
                    else{
                        height = 0;
                    };
                    game_piece.setPosition(
                        game_piece.positionToHole( i )[ j%4 ].x,
                        game_piece.positionToHole( i )[ j%4 ].y+height,
                        game_piece.positionToHole( i )[ j%4 ].z
                    )
                    game_piece.userData["hole"] = i;
                    this.stones.push(game_piece);
                }

            }
        }

        console.log(this.stones)

        // this.light_glow = new LightGlow(this.scene,{"hole":1})
        // this.light_glow.setPosition(
        //     this.light_glow.positionToHole(1)[0].x,
        //     this.light_glow.positionToHole(1)[0].y,
        //     this.light_glow.positionToHole(1)[0].z,
        // )

        this.light_glows = [];
        // if(sessionStorage['gracz'] == 1){
        //     this.addLightGlows(1)
        // }
        // this.addLightGlows(1)
        // this.addLightGlows(2)
        document.addEventListener('keydown', (e)=> {
            console.log(`Key: s${e.key} | ${e.keyCode} | Shift: ${e.shiftKey}` ) ;
            switch (e.keyCode) {
                case 16:
                    this.deleteGlows();
            }
        })
        this.render();
    }

    addLightGlows(player,socket){

        let kamienie = [];
        this.scene.children.forEach(element => {
            if(element.name == 'stone'){
                kamienie.push(element)
            }
            // console.log(element.name)
        });

        if (player === 1){
            let flag = 0;
            for (let i = 0 ; i <  6; i++) {
                let addGlow = 0;
                kamienie.forEach(kamien => {
                    if(kamien.userData.hole == i){
                        addGlow = 1
                    };
                });
                if(addGlow == 1){
                    let light_glow_obj = new LightGlow(this.scene,{"hole":i})
                    light_glow_obj.setPosition(
                        light_glow_obj.positionToHole(i)[0].x,
                        light_glow_obj.positionToHole(i)[0].y,
                        light_glow_obj.positionToHole(i)[0].z,
                    )
                    this.light_glows.push(light_glow_obj);
                    flag = 1;
                }
            }
            if(flag == 0){
                socket.emit('nextPlayer',{'player':sessionStorage['gracz'],'board':sessionStorage['plansza']})
            };
        } else {
            let flag = 0;
            for (let i = 6 ; i <  12; i++) {
                let addGlow = 0
                kamienie.forEach(kamien => {
                    if(kamien.userData.hole == i){
                        addGlow = 1
                    };
                });
                if(addGlow == 1){
                    let light_glow_obj = new LightGlow(this.scene,{"hole":i})
                    light_glow_obj.setPosition(
                        light_glow_obj.positionToHole(i)[0].x,
                        light_glow_obj.positionToHole(i)[0].y,
                        light_glow_obj.positionToHole(i)[0].z,
                    )
                    this.light_glows.push(light_glow_obj);
                    flag = 1;
                }
            }
            if(flag == 0){
                socket.emit('nextPlayer',{'player':sessionStorage['gracz'],'board':sessionStorage['plansza']})
            };
        }
    }

    deleteGlows(){
        this.light_glows.forEach( element =>{
            this.scene.remove( element )
        })
        this.light_glows = []
    }

    // moveStones(hole){
    //     // let jumpNum = 1;
    //     let jumpingElems = []
    //     this.stones.forEach(element => {
    //         if(element.userData.hole == hole){
    //             jumpingElems.push(element)
    //         }
    //         // console.log(element.name)
    //     });

    //     console.log(jumpingElems)
    //     while(jumpingElems.length>0){
    //         jumpingElems.forEach(element => {
    //             setTimeout(jumpPlusZ(element),15);
    //         })
    //         jumpingElems.pop();
    //     }


    //     // for(let p=0;p<jumpingElems.length;p+=1){
    //         // jumpingElems.forEach(element => {
    //         //     setTimeout(jumpPlusZ(element),15);
    //         // });
    //     //     jumpingElems.pop()
    //     // }


    // }

    render() {
        // console.log("render leci")
        this.renderer.render(this.scene, this.camera.threeCamera);
        // this.ico.update() // obrót ico
        if  (this.rock_model.model ) this.rock_model.update()
        requestAnimationFrame(this.render.bind(this));
    }
}


