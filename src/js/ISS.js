
import * as THREE from '../js/three.js/build/three.module.js';
import { GLTFLoader } from '../js/three.js/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;
var iss;


init();
render();

const createLights = () => {


    // an ambient light modifies the global color of a scene and makes the shadows softer
    const ambientLight = new THREE.AmbientLight(0xccb8b4, 0);
    scene.add(ambientLight);

    // A directional light shines from a specific direction.
    // It acts like the sun, that means that all the rays produced are parallel.
    const shadowLight = new THREE.DirectionalLight(0xffffff, 0);

    // Set the direction of the light
    shadowLight.position.set(150, 150, 0);
    //shadowLight.castShadow = true;

    const burnerLightDown = new THREE.DirectionalLight(0xDE00FF, 2.0);
    burnerLightDown.position.set(0, -5, 0);
    //burnerLightDown.castShadow = true;

    const burnerLightTop = new THREE.DirectionalLight(0x2f63c8, 5.0);
    burnerLightTop.position.set(0, 5, 0);

    scene.add(shadowLight);
    scene.add(burnerLightDown);
    scene.add(burnerLightTop);
    scene.add(ambientLight);
};

createLights();

function init() {

    const container = document.getElementsByClassName('header_canvas')[0];

    camera = new THREE.PerspectiveCamera(45, 1, 0.25, 20);
    camera.position.set(0, 0, 5);

    scene = new THREE.Scene();

    const loader_iss = new GLTFLoader().setPath('../dist/models/');
    loader_iss.load('ISS.gltf', function (gltf) {
        iss = gltf.scene;
        iss.scale.set(0.08, 0.08, 0.08);
        iss.rotation.set(0, -90, 0);
        iss.position.set(0, 0, 0);
        iss.name = 'ISS';
        scene.add(iss);
        render();

    });

    renderer = new THREE.WebGLRenderer({ antialias: true }, { alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(550, 550);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setAnimationLoop(animation);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = 1
    camera.updateProjectionMatrix();
    renderer.setSize(550, 550);

    render();

}

function render() {

    renderer.render(scene, camera);

}

function animation(time) {

    if (iss == undefined) {
        return;
    }

    iss.rotation.y += 0.001;
    iss.rotation.x += 0.003;

    renderer.render(scene, camera);
}