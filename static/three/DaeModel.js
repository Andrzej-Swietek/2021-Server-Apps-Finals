class DaeModel {

    constructor(modelPath,texturePath) {
        this.model = null;
        this.textureLoader = new THREE.TextureLoader();
        this.texture = this.textureLoader.load(texturePath); // np './models/sting/Textures/Sting_Base_Color.png'
        this.modelPath = modelPath;
    }

    addToScene(scene){
        let model;

        const loadingManager = new THREE.LoadingManager( () => {

            this.model.traverse( (child) => {
                // dla każdego mesha w modelu
                if (child.isMesh) {
                    console.log(child)
                    child.material.map = this.texture;
                }


            })

            scene.add(this.model);

        });


        const loader = new THREE.ColladaLoader(loadingManager);
        loader.load(this.modelPath,  (collada) => {

            this.model = collada.scene;

            console.log(this.model)
            this.model.castShadow = true
            this.model.rotation.y = 90;
            this.model.rotation.z = 90;
            this.model.position.y = 1;
            this.model.scale.set(.05,.05,.05);
        });

    }

    setModelScale(x,y,z){
        console.log(this.model)
        this.model.children[0].scale.set(x,y,z);
    }
    setPosition(x,y,z){
        this.model.position.set(x,y,z);
    }
    rotate(x=null, y = null, z = null){
        if (x != null) this.model.rotation.x = x;
        if (y != null) this.model.rotation.y = y;
        if (z != null) this.model.rotation.z = z;
    }

}
