import * as THREE from '../js/three.js/build/three.module.js';
import { GLTFLoader } from '../js/three.js/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;

let default_rock;
let rocks = [];
let rocks_x = [];
let rocks_y = [];
let rocks_speed = [];

let rock_count;
let minDistance;
let maxDistance;
if(window.innerWidth < 500) {
    minDistance = -20;
    maxDistance = 20;
    rock_count = 5;
}else if(window.innerWidth < 768) {
    minDistance = -50;
    maxDistance = 50;
    rock_count = 10;
}else{
    minDistance = -70;
    maxDistance = 70;
    rock_count = 30;
}


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

const positionAsteroids = () => {
    for (var i = 0; i < rock_count; i++) {
        let dist =minDistance + i * (maxDistance - minDistance) / rock_count;
        //rocks[i].position.set((2 * Math.random() - 1) * 5, -1 + (2 * Math.random() - 1) * 0.5, (2 * Math.random() - 1) * 2);
        //rocks[i].position.set((2 * Math.random() - 1) * 30, -1 + (2 * Math.random() - 1) * 1, (2 * Math.random() - 1) * 3);
        //rocks[i].position.set(minDistance + Math.random() * (maxDistance-minDistance),-1 + Math.random() * -2, Math.random()*-3);
        rocks[i].position.set(dist,-2 + Math.random() * 4, Math.random()*-5);
        
        // if(Math.abs(rocks[rocks.length-1].position.x - rocks[i].position.x) <= 20) {
        //     console.log("ada",Math.abs(rocks[rocks.length-1].position.x - rocks[i].position.x));
        //     rocks[i].position.set((2 * Math.random() - 1) * 20, -1 + (2 * Math.random() - 1) * 1, (2 * Math.random() - 1) * 3);
        //     console.log(i,rocks[i].position);
        // }

        
        let size = 0.8 + Math.random() * 1;
        rocks[i].scale.set(size, size, size);
        //rocks[i].scale.set(0.8 + Math.random() * 0.5, 0.8 + Math.random() * 0.5, 0.8 + Math.random() * 0.5);

    }
};

init();
render();
createLights();

function init() {

    const container = document.getElementsByClassName('transition')[0];

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / 200, 0.25, 200);
    //camera = new THREE.OrthographicCamera( -window.innerWidth, window.innerWidth, -window.innerHeight, window.innerHeight, 0.01, 200 );
    camera.position.set(0, 10, 10);
    camera.rotation.set(-0.5, 0, 0);

    scene = new THREE.Scene();

    const loader = new GLTFLoader().setPath('../dist/models/');
    loader.load('rock.gltf', function (gltf) {
        default_rock = gltf.scene;
        default_rock.scale.set(1, 1, 1);
        default_rock.name = 'rock';
        //rocks.push(default_rock);
        //scene.add(default_rock);

        for (var i = 0; i < rock_count; i++) {
            var rock = default_rock.clone();
            rock.rotation.set(Math.random() * 360, Math.random() * 360, Math.random() * 360);
            rocks.push(rock);
            rocks_x.push(Math.random() * 0.005);
            rocks_y.push(Math.random() * 0.005);
            rocks_speed.push(0.004 + Math.random() * 0.0012);
            scene.add(rock);
        }

        positionAsteroids();
        render();

    });

    renderer = new THREE.WebGLRenderer({ antialias: true }, { alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, 300);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setAnimationLoop(animation);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);


}

function onWindowResize() {

    camera.aspect = window.innerWidth / 300;
    camera.updateProjectionMatrix();
    positionAsteroids();

    renderer.setSize(window.innerWidth, 300);

    render();

}

function render() {

    renderer.render(scene, camera);

}

function animation(time) {

    for (var i = 0; i < rocks.length; i++) {
        rocks[i].rotation.x += rocks_x[i];
        rocks[i].rotation.y += rocks_y[i];

        rocks[i].position.x += rocks_speed[i];

        if (rocks[i].position.x > maxDistance ) {
            rocks[i].position.x = minDistance;
        }
    }

    renderer.render(scene, camera);

}