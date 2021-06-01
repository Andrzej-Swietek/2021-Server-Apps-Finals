
function jumpMinusZ(obj){ 
    
    obj.rotation.z += Math.PI/2
    let licznik = 0
    let startingPosition = obj.position.x
    let int = setInterval(() => {
        obj.rotation.z += (Math.PI)/15
        obj.translateX(0.2)
        licznik+=1;
        if(licznik==15){
            clearInterval(int)
            obj.rotation.z += Math.PI/2
            obj.position.y = 0.75
            obj.position.x = startingPosition+2
            console.log(obj.position)
        }
    }, 5); 
}


function jumpPlusZ(obj){ 
    // return new Promise(resolve=>{
        obj.rotation.z -= Math.PI/2
        let licznik = 0
        let startingPosition = obj.position.x
        let int = setInterval(() => {
            obj.rotation.z -= (Math.PI)/15
            obj.translateX(-0.2)
            licznik+=1;
            if(licznik==15){
                clearInterval(int)
                obj.rotation.z -= Math.PI/2
                obj.position.y = 0.75
                obj.position.x = startingPosition+2
                console.log(obj.position)
                // resolve(1)
            }
        }, 5); 
    // })

}


function jumpMinusX(obj){ 
    obj.rotation.x -= Math.PI/2
    let licznik = 0
    let startingPosition = obj.position.z
    let int = setInterval(() => {
        obj.rotation.x -= (Math.PI)/15
        obj.translateZ(0.2)
        licznik+=1;
        if(licznik==15){
            clearInterval(int)
            obj.rotation.x -= Math.PI/2
            obj.position.y = 0.75
            obj.position.z = startingPosition+2
            console.log(obj.position)
        }
    }, 5); 
}


function jumpPlusX(obj){ 
    obj.rotation.x += Math.PI/2
    let licznik = 0
    let startingPosition = obj.position.z
    let int = setInterval(() => {
        obj.rotation.x += (Math.PI)/15
        obj.translateZ(-0.2)
        licznik+=1;
        if(licznik==15){
            clearInterval(int)
            obj.rotation.x += Math.PI/2
            obj.position.y = 0.75
            obj.position.z = startingPosition+2
            console.log(obj.position)
        }
    }, 5); 
}

