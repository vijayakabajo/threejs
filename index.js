import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

// Renderer 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene and Camera
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

//can move camera with mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//Adding object/mesh to the scene
// const geometry = new THREE.BoxGeometry();
const geometry = new THREE.SphereGeometry(1, 32, 32); 
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
//   cube.rotation.x +=0.001;
  cube.rotation.y += 0.02;
  controls.update();
  renderer.render(scene, camera);
}
animate();
