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

//Adding object/mesh to the scene
// const geometry = new THREE.BoxGeometry();


const geometry = new THREE.SphereGeometry(1, 40, 40);  //radius, widthSegments, heightSegments
const material = new THREE.MeshBasicMaterial({ color: 0x1e90ff, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//to make it Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x +=0.003;
  cube.rotation.y += 0.004;
    // cube.rotation.z += 0.005;
  controls.update();
  renderer.render(scene, camera);
}
animate();
