import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

// Camera //Scene //Renderer

// Renderer 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); //or you can use canvas on HTML side for rendering


// Scene and Camera
const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(     //FOV, Aspect Ratio, Near, Far
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
); 
camera.position.z = 2;  //positioning camera a lil far to see things at the center
camera.position.y = 0.5; //positioning camera a lil higher to see things at the center


//can move camera with mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.02;

//Adding object/mesh to the scene
// const geometry = new THREE.BoxGeometry();


const geometry = new THREE.SphereGeometry(1, 30, 30);  //radius, widthSegments, heightSegments
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true}); //color, flatShading
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const wiremat = new THREE.MeshBasicMaterial({ color: 0xffff0f, wireframe: true });  //color, wireframe
const wiremesh = new THREE.Mesh(geometry, wiremat); 
// scene.add(wiremesh);
cube.add(wiremesh); //adding wireframe to the cube so that it moves with the cube
wiremesh.position.set(0, 0, 0); //positioning wireframe to the center of the cube

const wiremat2 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });  //color, wireframe
const wiremesh2 = new THREE.Mesh(geometry, wiremat2);
cube.add(wiremesh2); //adding wireframe to the cube so that it moves with the cube
wiremesh2.position.set(0, 0, 0); //positioning wireframe to the center of the cube
wiremesh2.scale.set(1.7, 1.7, 1.7); //to make the wireframe bigger than the cube

const light  = new THREE.HemisphereLight(0x0000ff, 0xff00bb); //color, groundColor, intensity
scene.add(light);

//to make it Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x +=0.002;
  cube.rotation.y -= 0.02;
  wiremesh.scale.set(1.4, 1.4, 1.4); //to make the wireframe bigger than the cube
    // cube.rotation.z += 0.005;
    // wireframe.scale.set(1.01, 1.01, 1.01); //to make the wireframe bigger than the cube
    controls.update(); //to make the camera move with mouse
  renderer.render(scene, camera);
}
animate();
