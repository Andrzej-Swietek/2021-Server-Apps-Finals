class DaeModel {

    constructor(modelPath,texturePath) {
        this.model = null
        this.textureLoader = new THREE.TextureLoader();
        this.texture = this.textureLoader.load(texturePath); // np './models/sting/Textures/Sting_Base_Color.png'
        this.modelPath = modelPath;
    }

    async addToScene(scene, x=0,y=0,z=0,alfa=0, beta=0,gamma=0){
        return new Promise( resolve => {

            const loadingManager = new THREE.LoadingManager( () => {

                this.model.traverse( (child) => {
                    // dla każdego mesha w modelu
                    if (child.isMesh) {
                        // console.log(child)
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

                this.model.rotation.x = alfa;
                this.model.rotation.y = beta;
                this.model.rotation.z = gamma;

                this.model.position.x = x;
                this.model.position.y = y;
                this.model.position.z = z;
                this.model.scale.set(.05,.05,.05);
                resolve(this.model);
            });

        })
        // let model;

    }

    setModelScale(x,y,z){
        console.log(this.model)
        this.model.scale.set(x,y,z);
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
