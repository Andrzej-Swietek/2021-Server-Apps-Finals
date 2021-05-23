class GLTFModel {
    constructor(modelPath) {
        this.modelPath =  modelPath   //'models/duck/duck.gltf';
        this.model;
    }
    addToScene(scene){
        // dodanie do sceny

        return new Promise( resolve => {
            const loader = new THREE.GLTFLoader();
            loader.load(this.modelPath,  (gltf)=> {
                this.mixer = new THREE.AnimationMixer(gltf);
                console.log("ew lista animacji ",gltf.scene.animations)

                gltf.scene.traverse( (child) => {
                    // tu można wykonać dowolną operację dla każdego mesha w modelu
                    if (child.isMesh) {
                        console.log(child)
                        scene.add(gltf.scene);
                        this.model = gltf.scene;
                        resolve(this.model)
                    }
                });
            }, undefined, function (error) {
                console.error(error);
            });
        })


    }
    test_log(){
        console.log("_______ GLTF ________"+this.model)
    }
    setPosition(x,y,z){
        this.model.position.set(x,y,z);
    }

    setScale(x,y,z){
        this.model.scale.set(x,y,z);
    }

}
