class GLTFModel {
    constructor(modelPath) {
        this.modelPath =  modelPath   //'models/duck/duck.gltf';
    }
    addToScene(scene){
        // dodanie do sceny


        const loader = new THREE.GLTFLoader();
        loader.load(this.modelPath,  (gltf)=> {
            this.mixer = new THREE.AnimationMixer(gltf);
            console.log("ew lista animacji ",gltf.scene.animations)

            gltf.scene.traverse(function (child) {
                // tu można wykonać dowolną operację dla każdego mesha w modelu
                if (child.isMesh) {
                    console.log(child)
                    scene.add(gltf.scene);
                }
            });
        }, undefined, function (error) {
            console.error(error);
        });
    }
}
