
import * as THREE from '../js/three.js/build/three.module.js';
import { GLTFLoader } from '../js/three.js/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;
let size = 500;
let rover;





const createLights = () => {
    const shadowLight = new THREE.DirectionalLight(0xccb8b4, 1.0);
    shadowLight.position.set(0, 5, 10);

    const burnerLightDown = new THREE.DirectionalLight(0xDE00FF, 0.01);
    burnerLightDown.position.set(0, -5, 0);

    const burnerLightTop = new THREE.DirectionalLight(0x2f63c8, 0.9);
    burnerLightTop.position.set(0, 5, 0);

    scene.add(shadowLight);
    scene.add(burnerLightDown);
    scene.add(burnerLightTop);
};

init();
render();
createLights();

function init() {

    const container = document.getElementsByClassName('rover_canvas')[0];

    camera = new THREE.PerspectiveCamera(45, 1, 0.25, 20);
    camera.position.set(0, 0, 5);

    scene = new THREE.Scene();

    const loader_rover = new GLTFLoader().setPath('../dist/models/');
    loader_rover.load('Astra.gltf', function (gltf) {
        rover = gltf.scene;
        rover.scale.set(1.2, 1.2, 1.2);
        rover.rotation.set(0, 45, 0);
        rover.position.set(0, 0, 0);
        rover.name = 'Astra';
        scene.add(rover);
        render();

    });

    
    if(window.innerWidth < 500){
        size = 200;
    }else if(window.innerWidth < 768){
        size = 300;
    }else{
        size = window.innerWidth / 4;
    }

    renderer = new THREE.WebGLRenderer({ antialias: true }, { alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(size, size);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setAnimationLoop(animation);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    if(window.innerWidth < 500){
        size = 200;
    }else if(window.innerWidth < 768){
        size = 300;
    }else{
        size = window.innerWidth / 4;
    }

    camera.aspect = 1
    camera.updateProjectionMatrix();
    renderer.setSize(size, size);

    render();

}

function render() {

    renderer.render(scene, camera);

}

function animation(time) {

    if (rover == undefined) {
        return;
    }

    rover.rotation.y -= 0.001;
    rover.rotation.x += 0.002;

    renderer.render(scene, camera);
}