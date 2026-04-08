function reproducirSonido() {
    const sonidos = [
        'resources/eructo.mp3',
        'resources/eructo2.mp3',
        'resources/eructo3.mp3'
    ];
    
    // Elige uno al azar
    const elegido = sonidos[Math.floor(Math.random() * sonidos.length)];
    const audio = new Audio(elegido);
    audio.play();
}