class RaycasterHandler {
    constructor(scene, camera) {
        this.raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D

        document.onmousedown = (event)=>{
            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, camera);

            let intersects = this.raycaster.intersectObjects(scene.children);
            console.log(intersects.length)
            if (intersects.length > 0) {
                // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
                console.log(intersects[0].object);
            }
        }
    }
//TODO: Onclicki poszczególnych elementów - rozne akcje
}
