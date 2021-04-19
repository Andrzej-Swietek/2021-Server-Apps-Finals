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

        this.render();
    }

    render() {

        console.log("render leci")

        this.renderer.render(this.scene, this.camera.threeCamera);
        this.ico.update() // obrót ico

        requestAnimationFrame(this.render.bind(this));
    }
}


