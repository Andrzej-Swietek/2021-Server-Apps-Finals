class Stone extends THREE.Mesh{
    constructor(scene, userdata) {
        super();
        this.texture = new THREE.TextureLoader().load('materials/brick.jpg');
        this.geometry = new THREE.SphereGeometry(.25, 32, 32);
        // this.material =new THREE.MeshBasicMaterial( {color: 0xffff00} );
        this.screen = scene;
        this.userData = userdata;

        this.setPosition(5, 2, 5)
        this.material = new THREE.MeshBasicMaterial({
            wireframe: false,
            vertexColors: true,
            side: THREE.DoubleSide,
            map: this.texture,
            transparent: true,
            opacity: 0.8,

        })

        this.screen.add(this)
    }
    setPosition(x,y,z){
        this.position.set(x,y,z);
    }
}
