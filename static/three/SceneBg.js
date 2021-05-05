class SceneBg{

    constructor(scene) {
        console.log("scene bg")
        this.scene = scene;
        this.geometry =  new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            // color: 0xffffff,
            // side: THREE.DoubleSide,
            // wireframe: false,
            // transparent: false,
            // opacity: 0.9,
            // vertexColors: true
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('materials/bg.jpg') ,
            transparent: true,
            opacity: 0.8,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh)
        this.mesh.scale.set(100,100,100);
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
