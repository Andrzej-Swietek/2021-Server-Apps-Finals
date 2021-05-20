function init() {
    //div
    const container = document.getElementById('root');
    //main class object
    const main = new Main(container);
    main.objectSetup().then( d => console.log("OBJECT SCENE LOADED") )
    // TODO:: W THENIE MSC NA START GRY JAK UI SIE ZALADUJE
}

init();
