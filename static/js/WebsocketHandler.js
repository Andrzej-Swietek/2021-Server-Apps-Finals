class WebsocketHandler {
    ws;
    constructor(websocketServer) {
        this.ws = new WebSocket(websocketServer);
        /**
         * wysłanie danych na serwer przy podłączeniu klienta do serwera
         */

        this.ws.onopen = () => {
            this.ws.send("websocket klient podlaczyl sie do serwera");
        }

        /**
         * odebranie danych z serwera i reakcja na nie
         * czyli utworzenie nowego diva z komunikatem
         */

        this.ws.onmessage = (e) => {
            console.log(e, e.data);
            // createMessageDiv(e.data);
        }

        /**
         * obsługa błędów
         */

        this.ws.onerror = (e) => {
            console.log(e.message);
        }

        /**
         * zamknięcie połączenia
         */

        this.ws.onclose = (e) => {
            console.log(e.code, e.reason);
        };

    }
    sendMessage(content){
        this.ws.send(content)
    }


}
