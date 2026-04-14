function reproducirSonido() {
    const sonidos = [
        'resources/eructo.mp3',
        'resources/eructo2.mp3',
        'resources/eructo3.mp3'
    ];

    const elegido = sonidos[Math.floor(Math.random() * sonidos.length)];
    const audio = new Audio(elegido);
    audio.play();
}

function itemRandom(item) {

    if (item === "modelo") {
        const imagenes = [
            'resources/dino2.glb',
            'resources/dragon.glb',
            'resources/leon.glb'
        ];

        const elegido = imagenes[Math.floor(Math.random() * imagenes.length)];
        return elegido;
    }

    if(item==="fondo"){
        const imagenes = [
            'img/fondo1.jpg',
            'img/fondo2.jpg',
            'img/fondo3.jpg',
            'img/fondo4.jpg',
            'img/fondo5.jpg',
            'img/fondo6.jpg',
            'img/fondo7.jpg',
            'img/fondo8.jpg',
            'img/fondo9.jpg',
            'img/fondo10.jpg',
            'img/fondo11.jpg',
            'img/fondo12.jpg'
        ];

        const elegido = imagenes[Math.floor(Math.random() * imagenes.length)];
        return elegido;
    }
}
