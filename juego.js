var player, player1img, player2img;
var fotos, fotosimg;
var pisobunquer;
var gameState = 0;
var formulario;
var balas = [];
var balasImg;
var naracion = [
    "En el año 2030, se confirmó la 3ª guerra mundial.",
    "Las grandes potencias querían el mundo de su lado.",
    "Por eso empezaron a atacar con bombas nucleares.",
    "Luego de esto, la civilización humana quedó devastada; de los 8,000 millones de humanos solo quedaron 100 vivos.",
    "La mayoría de sobrevivientes se transformaron en mutantes sin control, ni humanidad, solo queriendo saciar su hambre.",
    "De esos 100 que quedaron, esta es la historia de uno de ellos.",
];
var indiceNaracion = 0;
var ultimoDisparo = 0; // Variable para hacer un seguimiento del tiempo desde el último disparo

function preload() {
    // Carga las imágenes aquí
    fotosimg = loadImage("assets/foto1.jpg");
    player1img = loadImage("assets/player1.jpg");
    player2img = loadImage("assets/player2.png");
    balasImg = loadImage("assets/bala.jpg"); // Carga la imagen de la bala
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    
    // Crea el sprite de fotos y agrega la imagen
    fotos = createSprite(width - 1100, height - 600, 400, 400);
    fotos.addImage(fotosimg);
    fotos.scale = 0.7;
    
    // Crea el sprite del jugador
    player = createSprite(width - 1100, height - 30, 20, 20);
    player.addImage("1", player1img);
    player.addImage("2", player2img);
    player.scale = 0.2;
    player.visible = false;
    
    // Crea el sprite de pisobunquer
    pisobunquer = createSprite(width - 1100, height - 20, 9000, 100);
    pisobunquer.visible = false;

    formulario = new Form();
}

function draw() {
    background(0);
    camera.position.x = player.position.x;
    
    // Control de los diferentes estados de juego
    if (gameState == 0) {
        formulario.display();
    } else if (gameState == 1) {
        // Puedes agregar lógica para gameState == 1 si es necesario
    } else if (gameState == 2) {
        mostrarNaracion();
        drawSprites();
    } else if (gameState == 3) {
        fotos.remove();
        pisobunquer.visible = true;
        player.visible = true;

        // Control de teclas para mover al jugador
        if (keyDown("d")) {
            player.x += 10;
        }
        if (keyDown("space")) {
            player.y = player.y-=20;
        }
        if (keyDown("a")) {
            player.x -= 10;
        }
        if (keyDown("s"), player.y += 10);

        // Control de disparo y animación
        if (mouseIsPressed && mouseButton === LEFT) {
            player.changeAnimation("2",player2img);
            dispararBala();
        } else {
            setTimeout(() => {
                player.changeAnimation("1",player1img);
            }, 1500);
        }

        drawSprites();
    }

    // Actualiza la gravedad del jugador
    player.velocityY = player.velocityY + 0.4;
    player.collide(pisobunquer);

    // Actualiza las balas
    actualizarBalas();
}

function dispararBala() {
    let tiempoActual = millis(); // Obtener el tiempo actual en milisegundos

    // Verifica si han pasado al menos 2 segundos (2000 milisegundos) desde el último disparo
    if (tiempoActual - ultimoDisparo >= 1000) {
        // Crear un nuevo sprite para la bala
        let nuevaBala = createSprite(player.x, player.y-20, 10, 10);
        nuevaBala.addImage(balasImg); // Asigna la imagen de bala cargada al sprite
        nuevaBala.scale = 0.01; // Cambia el tamaño de la bala a 0.1
        nuevaBala.velocityX = 20; // Aumenta la velocidad de la bala a 15

        // Agrega la nueva bala al array de balas
        balas.push(nuevaBala);

        // Actualiza el tiempo del último disparo
        ultimoDisparo = tiempoActual;
    }
}

function actualizarBalas() {
    for (let i = balas.length - 1; i >= 0; i--) {
        let bala = balas[i];
        
        // Elimina la bala si sale de la pantalla
        
    }
}

function mostrarNaracion() {
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text(naracion[indiceNaracion], fotos.position.x, fotos.position.y + 300);
}

function keyPressed() {
    if (keyCode === ENTER && indiceNaracion < naracion.length - 1) {
        indiceNaracion++;
    } else if (keyCode === ENTER && indiceNaracion === naracion.length - 1) {
        gameState = 3;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
