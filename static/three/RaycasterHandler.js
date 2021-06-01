class RaycasterHandler {
    constructor(scene, camera, socket) {
        this.raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D
        this.socket = socket

        this.socket.on('enemyMoveSend',(information)=>{
            // console.log(information['board'])
            if(information['board'] == sessionStorage['plansza']){
                if(information['player'] != sessionStorage['gracz']){
                    // console.log(information['doc'])
                    console.log('doakdonibubunlon')
                    moveStones(information['doc'])
                }
            }
            console.log(information)
        })


        document.onmousedown = (event)=>{
            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, camera);

            let intersects = this.raycaster.intersectObjects(scene.children, true);
            console.log(intersects.length)
            if (intersects.length > 0) {
                // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
                console.log(intersects[0].object, intersects[0].object.name, intersects.length );
            }
            if (intersects[0].object.name == 'LightGlow'){
                moveStones(intersects[0].object.userData.hole);
                this.socket.emit('playerMover',{'board':sessionStorage['plansza'],'player':sessionStorage['gracz'],'doc':intersects[0].object.userData.hole})
                
                this.socket.emit('nextPlayer',{'player':sessionStorage['gracz']})

                // this.socket.emit('enemyMove',{'board':sessionStorage['plansza'],'player':sessionStorage['gracz'],'doc':intersects[0].object.userData.hole})
                
                // if(intersects[0].object.userData.hole == 11){
                //     moveStones(11)
                // }
                // else if(intersects[0].object.userData.hole >= 0 && intersects[0].object.userData.hole < 5){
                //     moveStones(intersects[0].object.userData.hole)
                // }
                // else if(intersects[0].object.userData.hole == 5){
                //     moveStones(5)
                // }
                // else if(intersects[0].object.userData.hole > 5 && intersects[0].object.userData.hole < 11){
                //     moveStones(intersects[0].object.userData.hole)
                // }
                // else{
                //     jumpMinusZ(intersects[0].object)
                // }

            }

            // moveStones(0)
        }
        function moveStones(hole) {
            let jumpingElems = [];
            let newHole = 0; //następna dziura do której pakujemy piłki
            let height = 0; //wysokośc na której będziemy ustawiać piłki
            let ballsInHole = 0; //piłki w następnej dziurze
            scene.children.forEach(element => {
                if(element.name == 'stone'){
                    if(element.userData.hole == hole){
                        jumpingElems.push(element)         
                    }
                }
                // console.log(element.name)
            });
            console.log(jumpingElems)
                // while(jumpingElems.length>0){
            let counter = 0
                    jumpingElems.forEach(element => {
                        counter+=1;
                        newHole = element.userData.hole+counter;
                        ballsInHole = 0;
                        if(newHole>11){
                            newHole-=12;
                        }
                        scene.children.forEach(element => {
                            if(element.name == 'stone'){
                                if(element.userData.hole == newHole){
                                    ballsInHole+=1        
                                }
                            }
                            // console.log(element.name)
                        });
                        //ustawienie heighta
                        if(ballsInHole>=4 && ballsInHole<8){
                            height = 0.5
                        }
                        else if(ballsInHole>=8 && ballsInHole<12){
                            height = 1
                        }
                        else if(ballsInHole>=12){
                            height = 1.5
                        }
                        else{
                            height = 0;
                        }
                        console.log(ballsInHole)
                        element.setPosition(
                            element.positionToHole( newHole )[ (ballsInHole)%4 ].x,
                            element.positionToHole( newHole )[ (ballsInHole)%4 ].y+height,
                            element.positionToHole( newHole )[ (ballsInHole)%4 ].z,
                            element.userData.hole = newHole,
                            // element.hoverMaterial()
                        )
                    })
                    let toRemove = [];
                    ballsInHole = 0;
                    scene.children.forEach(element => {
                        if(element.name == 'stone'){
                            if(element.userData.hole == newHole){
                                ballsInHole+=1        
                            }
                        }
                    });
                    if(ballsInHole%2==0){
                        scene.children.forEach(element => {
                            if(element.name == 'stone'){
                                if(element.userData.hole == newHole){
                                    // console.log('piiidooo')
                                    console.log(element.userData.hole,element.userData.id)
                                    // scene.remove(element)
                                    toRemove.push(element)
                                }
                            }
                        })
                    }
                    toRemove.forEach(element => {
                        scene.remove(element)
                    })


                    // jumpingElems.pop()
                // }
          }
    }
//TODO: Onclicki poszczególnych elementów - rozne akcje
}
