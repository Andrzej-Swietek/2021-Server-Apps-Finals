class DaeModel {

    constructor(modelPath,texturePath) {
        this.model = null;
        this.textureLoader = new THREE.TextureLoader();
        this.texture = this.textureLoader.load(texturePath); // np './models/sting/Textures/Sting_Base_Color.png'
        this.modelPath = modelPath;
    }

    addToScene(scene){
        const loadingManager = new THREE.LoadingManager(function () {

            this.model.traverse(function (child) {
                // dla każdego mesha w modelu
                if (child.isMesh) {
                    console.log(child)
                    child.material.map = this.texture;
                }
                scene.add(this.model);
            })
        });

        this.loader = new THREE.ColladaLoader(loadingManager);
        this.loader.load(this.modelPath, function (collada) { //'models/sting/sting.dae'

            this.model = collada.scene;
            console.log(model)
            this.model.castShadow = true
            this.model.rotation.y = 90;
            this.model.rotation.z = 90;
            this.model.position.y = 1;
            this.model.scale.set(2,2,2)


        });

    }
}
