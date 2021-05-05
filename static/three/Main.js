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


        this.sceneBg = new SceneBg(this.scene);
        this.sceneBg.moveTo(0,0,0)

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

    }

    render() {


        // console.log("render leci")

        this.renderer.render(this.scene, this.camera.threeCamera);
        this.ico.update() // obrót ico
        requestAnimationFrame(this.render.bind(this));
    }
}


