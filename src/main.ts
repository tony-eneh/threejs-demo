import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.bg') as HTMLCanvasElement;

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(30);

const orbitControls = new OrbitControls(camera, canvas);

// mesh
const geometry = new THREE.TorusGeometry(10, 3, 20, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xfaed12,
});
const torus = new THREE.Mesh(geometry, material);

// lights
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);

// scene
const scene = new THREE.Scene();
scene.add(torus, pointLight, ambientLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(window.innerWidth, 200);
scene.add(gridHelper);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

function animate() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  orbitControls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
