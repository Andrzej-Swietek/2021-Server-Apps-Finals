class Fontain extends DaeModel{
    constructor() {
        super('/models/fontanna/fontanna.dae','/models/fontanna/fontanna/Water_Pool_Light.jpg')
    }
    test_log(){
        console.log(this.model, this)
    }
}
