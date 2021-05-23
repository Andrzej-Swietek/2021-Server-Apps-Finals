class Fontain extends DaeModel{
    constructor() {
        // super('/models/fontanna/fontanna.dae','/models/fontanna/fontanna/_1.jpg')
        super('/models/fontanna/fontanna.dae','/models/fontanna/fontanna/Water_Pool_Light.jpg')

        this.mats = [
            new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader(this.textureLoader.load('models/fontanna/fontanna/_1.jpg')) } ) ,
            new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader(this.textureLoader.load('models/fontanna/fontanna/Water_Pool_Light.jpg')) } )
        ]
    }
    test_log(){
        console.log(this.model, this)
    }
}
