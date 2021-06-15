class LightGlow extends THREE.Points {
    constructor(scene, userdata) {
        super();
        this.scene = scene;
        this.geometry = new THREE.CylinderGeometry( 0.5, 0.5, 3, 32 );
        // this.material = new THREE.MeshBasicMaterial({
        //     wireframe: false,
        //     vertexColors: true,
        //     side: THREE.DoubleSide,
        //     // map: this.texture,
        //     color: 0xFFFF00,
        //     transparent: true,
        //     opacity: 1,
        //
        // })


        this.material = new THREE.PointsMaterial({
            color: 0xffff00,
            depthWrite: false,
            transparent: true,
            size: 1,
            map: new THREE.TextureLoader().load('/img/particle.png'),
            blending: THREE.AdditiveBlending,
            opacity: .3,
        })
        this.name = "LightGlow";
        this.userData = userdata;

        this.setPosition(0,1,0);
        this.scene.add(this)

        this.radius = 0.5
    }

    positionToHole(n){
        let boardSide = (n<=5)? 1 : -1; // 1 / -1

        let fx = (n <= 5)? 2*(n)-5 : -2*(n)+17;


        return this.holes = [
            { x: fx, y: 2, z: boardSide },
        ]


    }

    setPosition(x,y,z){
        this.position.set(x,y,z);
    }
}
