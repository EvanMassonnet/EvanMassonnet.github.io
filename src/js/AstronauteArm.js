
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera, scene, renderer;
var astronaute_arm;

const createLights = () => {

    const ambientLight = new THREE.AmbientLight(0xccb8b4, 0.05);
    scene.add(ambientLight);

    const blueLight = new THREE.DirectionalLight(0x3ba0ff, 0.5);
    blueLight.position.set(0, -1, 0);

    const purpleLight = new THREE.DirectionalLight(0x803bff, 0.5);
    purpleLight.position.set(-1, 0.5, -0.5);

    scene.add(blueLight);
    scene.add(purpleLight);
    scene.add(ambientLight);
};

init();
render();
createLights();

function init() {

    const container = document.getElementsByClassName('timeline_canvas_right')[0];

    camera = new THREE.PerspectiveCamera(45, 300 / 300, 0.25, 20);
    camera.position.set(0, 0, 5);

    scene = new THREE.Scene();

    const loader_astronaute_arm = new GLTFLoader().setPath('../dist/models/');
    loader_astronaute_arm.load('Astronaute_Arm.gltf', function (gltf) {
        astronaute_arm = gltf.scene;
        astronaute_arm.scale.set(0.05, 0.05, 0.05);
        astronaute_arm.rotation.set(0, -90, 0);
        astronaute_arm.position.set(0, 0, 0);
        astronaute_arm.name = 'astronaute_arm';
        scene.add(astronaute_arm);
        render();

    });

    renderer = new THREE.WebGLRenderer({ antialias: true }, { alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(300, 300);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setAnimationLoop(animation);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = 300 / 300;
    camera.updateProjectionMatrix();

    renderer.setSize(300, 300);

    render();

}

function render() {

    renderer.render(scene, camera);

}

function animation(time) {

    if (astronaute_arm == undefined) {
        return;
    }

    astronaute_arm.rotation.x += 0.003;
    astronaute_arm.rotation.y -= 0.005;

    renderer.render(scene, camera);
}