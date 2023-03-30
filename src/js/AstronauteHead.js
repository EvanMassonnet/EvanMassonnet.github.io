
import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let camera, scene, renderer;

var astronaute_head, astronaute_arm;

init();
render();

const createLights = () => {

    // an ambient light modifies the global color of a scene and makes the shadows softer
    const ambientLight = new THREE.AmbientLight(0xccb8b4, 0.05);
    scene.add(ambientLight);

    const shadowLight = new THREE.DirectionalLight(0xffffff, 0);
    shadowLight.position.set(150, 150, 0);
    //shadowLight.castShadow = true;

    const blueLight = new THREE.DirectionalLight(0x3ba0ff, 0.5);
    blueLight.position.set(5, -1, 0.5);
    //blueLight.castShadow = true;

    const purpleLight = new THREE.DirectionalLight(0x803bff, 0.5);
    purpleLight.position.set(0, 1, -0.5);
    //purpleLight.castShadow = true;
    //scene.add(hemisphereLight);
    //scene.add(shadowLight);
    scene.add(blueLight);
    scene.add(purpleLight);
    scene.add(ambientLight);
};

createLights();

function init() {

    const container = document.getElementsByClassName('timeline_canvas_left')[0];

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(0, 0, 5);

    scene = new THREE.Scene();

    const loader_astronaute_head = new GLTFLoader().setPath('../dist/models/');
    loader_astronaute_head.load('Astronaute.gltf', function (gltf) {
        astronaute_head = gltf.scene;
        astronaute_head.scale.set(0.05, 0.05, 0.05);
        //astronaute_head.rotation.set(0, -90, 0);
        //astronaute_head.position.set(-1.5, 1, 0);
        astronaute_head.name = 'astronaute_head';
        scene.add(astronaute_head);
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

    if (astronaute_head == undefined) {
        return;
    }

    astronaute_head.rotation.z -= 0.003;

    renderer.render(scene, camera);
}