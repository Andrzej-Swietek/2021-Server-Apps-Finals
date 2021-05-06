class Skybox {
    materialArray = []
    constructor(scene) {


        let txUp = new THREE.TextureLoader().load('materials/skybox2-1.jpeg');
        let txFront = new THREE.TextureLoader().load('materials/skybox2-2.jpeg');
        let txBottom = new THREE.TextureLoader().load('materials/skybox2-3.jpeg');
        let txLeft = new THREE.TextureLoader().load('materials/skybox2-4.jpeg');
        let txBack = new THREE.TextureLoader().load('materials/skybox2-5.jpeg');
        let txRight = new THREE.TextureLoader().load('materials/skybox2-6.jpeg');


        this.materialArray.push( new THREE.MeshBasicMaterial({map: txFront}) );
        this.materialArray.push( new THREE.MeshBasicMaterial({map: txBack}) );

        this.materialArray.push( new THREE.MeshBasicMaterial({map: txUp}) );
        this.materialArray.push( new THREE.MeshBasicMaterial({map: txBottom}) );

        this.materialArray.push( new THREE.MeshBasicMaterial({map: txLeft}) );
        this.materialArray.push( new THREE.MeshBasicMaterial({map: txRight}) );



        this.materialArray.forEach( material =>{
            material.side = THREE.BackSide;
        })

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

        this.mesh = new THREE.Mesh(this.geometry,this.materialArray);
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
