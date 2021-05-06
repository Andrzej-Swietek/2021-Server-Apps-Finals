// import { Scene } from 'three';
// import Renderer from './Renderer';
// import Camera from './Camera';
// import Ico from './Ico';

class Main {
    constructor(container) {
        // właściwości klasy
        this.container = container;
        this.scene = new THREE.Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        this.ico = new Ico(this.scene);

        this.stone1 = new Cube(this.scene);
        this.stone1.moveTo(-5,0,-5);

        this.stone2 = new Cube(this.scene);
        this.stone2.moveTo(5,0,5)


        this.skybox = new Skybox(this.scene);
        this.skybox.moveTo(0,0,0)

        this.gridHelper = new THREE.GridHelper(10, 10);
        this.scene.add(this.gridHelper);

        this.render();

        this.controls = new THREE.OrbitControls(this.camera.threeCamera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.autoRotate = true;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 50;


        // this.ws = new WebsocketHandler('localhost:3000');
        const socket = new io();
        socket.on('message', message=>{
            console.log(message)
        });
        // Przykladdowa wlana wiadomosc
        socket.emit('playerMover', {"hole1": 4, "hole3": 4,"hole4": 4,"hole5": 4,"hole6": 4,"hole7": 4,"hole8": 4,"hole9": 4,"hole10": 4} );
    }

    render() {


        // console.log("render leci")

        this.renderer.render(this.scene, this.camera.threeCamera);
        this.ico.update() // obrót ico
        requestAnimationFrame(this.render.bind(this));
    }
}


