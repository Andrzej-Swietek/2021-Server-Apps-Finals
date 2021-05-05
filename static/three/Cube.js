class Cube {

    constructor(scene) {
        console.log("cube")
        this.scene = scene;
        this.geometry =  new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 0.9,
            vertexColors: true
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh)
    }
    update() {
        this.mesh.rotation.y += 0.01
    }
    moveTo(x,y,z){
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }
}
