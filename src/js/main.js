
import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let camera, scene, renderer;
let stats;

var iss, astronaute_head, astronaute_arm;
var default_rock;
var rocks = [];
var rocks_x = [];
var rocks_y = [];
var rocks_speed = [];

const rock_count = 50;

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
    //burnerLightTop.castShadow = true;
    //scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(burnerLightDown);
    scene.add(burnerLightTop);
    scene.add(ambientLight);
};

createLights();

function init() {

    const container = document.getElementsByClassName('header_canvas')[0];

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(0, 0, 5);

    scene = new THREE.Scene();

    const loader_iss = new GLTFLoader().setPath('../dist/models/');
    loader_iss.load('ISS.gltf', function (gltf) {
        iss = gltf.scene;
        iss.scale.set(0.05, 0.05, 0.05);
        iss.rotation.set(0, -90, 0);
        iss.position.set(0, 0, 0);
        iss.name = 'ISS';
        scene.add(iss);
        render();

    });

    const loader_astronaute_head = new GLTFLoader().setPath('../dist/models/');
    loader_astronaute_head.load('Astronaute.gltf', function (gltf) {
        astronaute_head = gltf.scene;
        astronaute_head.scale.set(0.02, 0.02, 0.02);
        astronaute_head.rotation.set(0, -90, 0);
        astronaute_head.position.set(-1.5, 1, 0);
        astronaute_head.name = 'astronaute_head';
        scene.add(astronaute_head);
        render();

    });

    const loader_astronaute_arm = new GLTFLoader().setPath('../dist/models/');
    loader_astronaute_arm.load('Astronaute_Arm.gltf', function (gltf) {
        astronaute_arm = gltf.scene;
        astronaute_arm.scale.set(0.02, 0.02, 0.02);
        astronaute_arm.rotation.set(0, -90, 0);
        astronaute_arm.position.set(1.5, 1, 0);
        astronaute_arm.name = 'astronaute_arm';
        scene.add(astronaute_arm);
        render();

    });

    const loader2 = new GLTFLoader().setPath('../dist/models/');
    //loader.load( 'DamagedHelmet.gltf', function ( gltf ) {
    loader2.load('rock.gltf', function (gltf) {
        default_rock = gltf.scene;
        default_rock.scale.set(0.3, 0.3, 0.3);
        default_rock.name = 'rock';
        rocks.push(default_rock);
        scene.add(default_rock);
        for (var i = 0; i < rock_count; i++) {
            var rock = default_rock.clone();
            //default_rock.scale.set(0.05 + Math.random() * 0.05 ,0.05 + Math.random() *0.05, 0.05 + Math.random() *0.05);
            default_rock.scale.set(0.1 + Math.random() * 0.05, 0.1 + Math.random() * 0.05, 0.1 + Math.random() * 0.05);
            rock.position.set((2 * Math.random() - 1) * 5, -1 + (2 * Math.random() - 1) * 0.5, (2 * Math.random() - 1) * 2);
            rock.rotation.set(Math.random() * 360, Math.random() * 360, Math.random() * 360);
            rocks.push(rock);
            rocks_x.push(Math.random() * 0.01);
            rocks_y.push(Math.random() * 0.01);
            rocks_speed.push(0.001 + Math.random() * 0.0012);
            scene.add(rock);
        }
        render();

    });

    renderer = new THREE.WebGLRenderer({ antialias: true }, { alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setAnimationLoop(animation);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    /*const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set( 0, 0, - 0.2 );
    controls.update();*/

    window.addEventListener('resize', onWindowResize);

    stats = new Stats();
    document.body.appendChild(stats.dom);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

function render() {

    renderer.render(scene, camera);

}

function animation(time) {

    if (iss == undefined || astronaute_arm == undefined || astronaute_head == undefined) {
        return;
    }

    iss.rotation.y += 0.001;
    iss.rotation.x += 0.003;

    astronaute_arm.rotation.y -= 0.001;
    //astronaute_arm.rotation.x += 0.003;

    astronaute_head.rotation.y -= 0.003;
    //astronaute_head.rotation.x += 0.003;

    //iss.position.x = Math.sin(time / 100000);
    //iss.position.y = Math.cos(time / 200000);

    for (var i = 0; i < rocks.length; i++) {
        rocks[i].rotation.x += rocks_x[i];
        rocks[i].rotation.y += rocks_y[i];

        rocks[i].position.x += rocks_speed[i];

        if (rocks[i].position.x > window.innerWidth / 400) {
            rocks[i].position.x = -window.innerWidth / 400;
        }
    }



    renderer.render(scene, camera);

    stats.update();
}