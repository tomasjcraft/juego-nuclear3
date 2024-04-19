class Form {
    constructor() {
        this.input = createInput("");
        this.button = createButton("jugar");
        this.button2 = createButton("crear nuevo mundo");
        // Inicialmente ocultamos el button2
        this.button2.hide();
    }

    posicionElementos() {
        this.input.position(width / 2 - 110, height / 2 - 80);
        this.button.position(width / 2 - 90, height / 2 - 20);
        this.button2.position(width / 2 - 90, height / 2);

        this.input.class("customInput");
        this.button.class("customButton");
        this.button2.class("customButton");
    }

    buttonPresionado() {
        this.button.mousePressed(() => {
            // Ocultamos el input y button
            this.input.hide();
            this.button.hide();
            // Mostramos button2
            this.button2.show();
            // Cambiamos el estado del juego
            gameState = 1;
        });
    }

    button2Presionado() {
        this.button2.mousePressed(() => {
            // Ocultamos el input y button2
            this.button2.hide();
            // Cambiamos el estado del juego
            gameState = 2;
        });
    }

    display() {
        this.posicionElementos();
        this.buttonPresionado();
        this.button2Presionado();
    }
}
