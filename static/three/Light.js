class Light {

    constructor(lightType, color, intensity, distance=0, angle= (Math.PI / 3)) {

        this.lightType = lightType;
        this.color = color;
        this.intensity = intensity;
        this.distance = distance;
        this.angle = angle;

        //pusty kontener na inne obiekty 3D
        this.container = new THREE.Object3D();

        //wywołanie funkcji init()
        this.init()
    }

    init() {

        // utworzenie i pozycjonowanie światła
        switch (this.lightType){
            case 'DIRECTIONAL':
                this.light = new THREE.DirectionalLight( this.color, this.intensity );
                break;
            case 'SPOT':
                this.light = new THREE.SpotLight( this.color, this.intensity, this.distance, this.angle );
                break;
            case 'AMBIENT':
                this.light = new THREE.AmbientLight( this.color, this.intensity );
                break;
            case 'POINT':
                this.light = new THREE.PointLight( this.color, this.intensity, this.distance );
                break;

            default:
                this.light = new THREE.DirectionalLight( this.color, this.intensity );
                break;
        }

        this.light.position.set( 0, 0, 0 ); // ma być w pozycji 0,0,0 kontenera - nie zmieniamy
        this.container.add( this.light );


        let lightMaterial = new THREE.MeshNormalMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 0.5,
            vertexColors: true
        });
        const sphere = new THREE.SphereGeometry( 1, 32, 32 );
        this.mesh = new THREE.Mesh(sphere,lightMaterial)
        this.container.add(this.mesh);
    }


    // funkcja zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    getLight() {
        return this.container;
    }

    changeColor (color) {
        console.log("zmiana koloru na " + color)
        try{
            this.light.color = color;
        } catch (e) {
            console.log("Light Color Change: "+e)
        }
    }

    setLightPosition(x,y,z){
        this.container.position.set(x,y,z)
    }

}
