var btn1 = document.getElementById('btn1')

btn1.onclick = ()=>{ 
    this.ico.rotation.z += Math.PI/2
    let licznik = 0
    let int = setInterval(() => {
        this.ico.rotation.z += (Math.PI)/50
        this.ico.translateX(0.3)
        licznik+=1;
        if(licznik==50){
            clearInterval(int)
            this.ico.rotation.z += Math.PI/2
            this.ico.position.y = 0
            this.ico.position.x = Math.round(this.ico.position.x)
            console.log(this.ico.position)
        }
    }, 5); 
}

var btn2 = document.getElementById('btn2')

btn2.onclick = ()=>{ 
    this.ico.rotation.z -= Math.PI/2
    let licznik = 0
    let int = setInterval(() => {
        this.ico.rotation.z -= (Math.PI)/50
        this.ico.translateX(-0.3)
        licznik+=1;
        if(licznik==50){
            clearInterval(int)
            this.ico.rotation.z -= Math.PI/2
            this.ico.position.y = 0
            this.ico.position.x = Math.round(this.ico.position.x)
            console.log(this.ico.position)
        }
    }, 5); 
}

var btn3 = document.getElementById('btn3')

btn3.onclick = ()=>{ 
    this.ico.rotation.x -= Math.PI/2
    let licznik = 0
    let int = setInterval(() => {
        this.ico.rotation.x -= (Math.PI)/50
        this.ico.translateZ(0.3)
        licznik+=1;
        if(licznik==50){
            clearInterval(int)
            this.ico.rotation.x -= Math.PI/2
            this.ico.position.y = 0
            this.ico.position.z = Math.round(this.ico.position.z)
            console.log(this.ico.position)
        }
    }, 5); 
}

var btn4 = document.getElementById('btn4')

btn4.onclick = ()=>{ 
    this.ico.rotation.x += Math.PI/2
    let licznik = 0
    let int = setInterval(() => {
        this.ico.rotation.x += (Math.PI)/50
        this.ico.translateZ(-0.3)
        licznik+=1;
        if(licznik==50){
            clearInterval(int)
            this.ico.rotation.x += Math.PI/2
            this.ico.position.y = 0
            this.ico.position.z = Math.round(this.ico.position.z)
            console.log(this.ico.position)
        }
    }, 5); 
}