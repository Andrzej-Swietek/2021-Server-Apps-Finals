class Rock2 {
    constructor(modelPath) {
        this.texturePath = 'models/skala2/skala2/material_1.jpg'


        this.texturePath1 = 'models/rock/skala1/material_1.jpg'
        this.texturePath2 = 'models/rock/skala1/material_2.jpg'
        this.texturePath3 = 'models/rock/skala1/material_11.png'
        this.texturePath4 = 'models/rock/skala1/grass_blade1.jpg'
        this.texturePath5 = 'models/rock/skala1/_03_-_Default1.jpg'

        this.textures = []

        this.model = null;
        this.textureLoader = new THREE.TextureLoader();
        this.texture = this.textureLoader.load(this.texturePath); // np './models/sting/Textures/Sting_Base_Color.png'

        this.textures.push(this.textureLoader.load(this.texturePath1))
        this.textures.push(this.textureLoader.load(this.texturePath2))
        this.textures.push(this.textureLoader.load(this.texturePath3))
        this.textures.push(this.textureLoader.load(this.texturePath4))
        this.textures.push(this.textureLoader.load(this.texturePath5))

        this.modelPath = modelPath;

        // this.texture = Promise.all([this.textureLoader.load('models/rock/textures/material_1.jpg'), this.textureLoader.load('models/rock/textures/material_2.jpg')], (resolve, reject) => {
        //     resolve(this.texture);
        // }).then(result => {
        //     // result in array of textures
        // });
    }
    addToScene(scene,x,y,z){
        let model;

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

            this.model.position.y = -3;
            this.moveTo(x,y,z);
            this.model.scale.set(.05,.05,.05);
        });

    }
    moveTo(x,y,z){
        console.log(this.model);

        this.model.position.x = x;
        this.model.position.y = y;
        this.model.position.z = z;
    }
}
