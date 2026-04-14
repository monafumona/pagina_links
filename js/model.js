import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 1. IMPORTAR EL CARGADOR DE MODELOS GLTF (AQUÍ)
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // <--- CAMBIO

let camera, scene, renderer, controls, mesh;

init();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 1);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load(itemRandom("fondo"),
        function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace
            scene.background = texture;
            scene.environment = texture;
        }
    );

    // 2. SUSTITUIR EL BLOQUE DE "FIGURA 3D" POR EL SIGUIENTE:
    const gltfLoader = new GLTFLoader(); // <--- CAMBIO

    // Reemplaza 'tu_modelo.glb' por el nombre de tu archivo exacto
    gltfLoader.load(itemRandom("modelo"), function (gltf) {
        const model = gltf.scene;

        model.traverse(function (child) {
            if (child.isMesh) {
                // 1. Forzamos un material estándar si el que trae da problemas
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xffffff,    // Color base blanco
                    metalness: 1.0,     // Totalmente metálico
                    roughness: 0.0,     // Espejo pulido
                    envMapIntensity: 1.5 // Fuerza del reflejo
                });

                // 2. IMPORTANTE: Indicar que el material necesita actualizarse
                child.material.needsUpdate = true;
            }
        });
        model.position.y = -0.4;
        scene.add(model);
        mesh = model;
    });

    // --- LUCES ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    window.addEventListener('resize', onWindowResize);
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    // Si 'mesh' ya se cargó, lo hará girar
    if (mesh) {
        mesh.rotation.y += 0.01;
    }
    controls.update();
    renderer.render(scene, camera);
}
