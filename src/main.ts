import './style.css';
import * as THREE from 'three';

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(30);

// mesh
const geometry = new THREE.TorusGeometry(10, 3, 20, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xfaed12,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

// light

// scene
const scene = new THREE.Scene();
scene.add(torus);

// render
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.bg') as HTMLCanvasElement,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

function animate() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
