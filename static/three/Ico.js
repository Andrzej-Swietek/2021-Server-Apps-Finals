// import {
//     IcosahedronGeometry,
//     MeshNormalMaterial,
//     Mesh,
// } from "three";

class Ico {

    constructor(scene) {
        console.log("ico")
        this.scene = scene;
        this.geometry =  new THREE.IcosahedronGeometry();
        this.material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh)
    }
    update() {
        this.mesh.rotation.y += 0.01
    }

}
