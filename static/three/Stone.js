class Stone extends THREE.Mesh{
    constructor(scene, userdata) {
        super();
        this.texture = new THREE.TextureLoader().load('materials/brick.jpg');
        this.radius = .25;
        this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        // this.material =new THREE.MeshBasicMaterial( {color: 0xffff00} );
        this.screen = scene;
        this.userData = userdata;

        this.setPosition(-1-this.radius, 0, -1+this.radius)
        this.material = new THREE.MeshBasicMaterial({
            wireframe: false,
            vertexColors: true,
            side: THREE.DoubleSide,
            map: this.texture,
            transparent: true,
            opacity: 0.8,

        })

        let n=11

        this.setPosition(this.positionToHole(n)[1].x, this.positionToHole(n)[1].y, this.positionToHole(n)[1].z)

        this.screen.add(this)
    }

    positionToHole(n){
        let boardSide = (n<=5)? 1 : -1; // 1 / -1

        let fx1 = (n <= 5)? 2*(n-this.radius/2)-5 : -2*(n-this.radius/2)+17;
        let fx2 = (n <= 5)? 2*(n+this.radius/2)-5 : -2*(n+this.radius/2)+17;

            return this.holes = [
                { x: fx1, y: 0, z: boardSide-this.radius },
                { x: fx1, y: 0, z: boardSide+this.radius },
                { x: fx2, y: 0, z: boardSide-this.radius },
                { x: fx2, y: 0, z: boardSide+this.radius }
            ]


    }
    setPosition(x,y,z){
        this.position.set(x,y,z);
    }
}
