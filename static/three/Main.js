class Main {
    constructor(container) {
        // właściwości klasy
        this.container = container;
        this.scene = new THREE.Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        // this.ico = new Ico(this.scene);
        // this.ico.mesh.scale.set(4,4,4)
        // this.ico.mesh.position.set(15,-3,8);
        // this.stone1 = new Cube(this.scene);
        // this.stone1.moveTo(-5,0,-5);

        this.stone2 = new Cube(this.scene);
        this.stone2.moveTo(5,0,5)

        new RaycasterHandler(this.scene,this.camera.threeCamera)

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
        const socket = new io();

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
            }
        });

        // ruch gracza
        for(let q=1;q<13;q++){
            document.getElementById(q).addEventListener('click',function(){
                socket.emit('playerMover',{'board':sessionStorage['plansza'],'player':sessionStorage['gracz'],'doc':this.id})
                console.log(this.id)
            })
        }

        // socket.emit('playerMover', {"hole1": 4, "hole3": 4,"hole4": 4,"hole5": 4,"hole6": 4,"hole7": 4,"hole8": 4,"hole9": 4,"hole10": 4} );

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


        this.stones = [];
        for (let i=0; i< 12; i++){
            for (let j = 0; j < 4 ; j++){
                let game_piece = new Stone(this.scene,{ name:"stone", id: i })
                game_piece.setPosition(
                    game_piece.positionToHole( i )[ j%4 ].x,
                    game_piece.positionToHole( i )[ j%4 ].y,
                    game_piece.positionToHole( i )[ j%4 ].z
                )
                game_piece.userData["hole"] = 4;
                this.stones.push(game_piece);
            }

        }

        console.log(this.stones)


        this.light_glow = new LightGlow(this.scene,{"hole":1})
        this.light_glow.setPosition(
            this.light_glow.positionToHole(1)[0].x,
            this.light_glow.positionToHole(1)[0].y,
            this.light_glow.positionToHole(1)[0].z,
        )
        this.render();
    }

    render() {
        // console.log("render leci")

        this.renderer.render(this.scene, this.camera.threeCamera);
        // this.ico.update() // obrót ico
        this.rock_model.update()
        requestAnimationFrame(this.render.bind(this));
    }
}


