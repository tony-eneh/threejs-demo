import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.bg') as HTMLCanvasElement;

/* OBJECTS */
// torus
const geometry = new THREE.TorusGeometry(10, 3, 20, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xfaed12,
});
const torus = new THREE.Mesh(geometry, material);

// stars
const starGeometry = new THREE.SphereGeometry(3, 20, 20);
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
const stars = Array(200)
  .fill(null)
  .map((_) => {
    const [x, y, z] = Array(3)
      .fill(null)
      .map((_) =>
        THREE.MathUtils.randFloatSpread(
          Math.min(window.innerWidth, window.innerHeight) * 2
        )
      );
    const star = starMesh.clone();

    star.position.set(x, y, z);

    return star;
  });

// cube
const pocoWatersTexture = new THREE.TextureLoader().load('poco-waters.jpg');
const pocoCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: pocoWatersTexture })
);

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(30);

// const orbitControls = new OrbitControls(camera, canvas);

/* LIGHTS */
const pointLight = new THREE.PointLight(0xffffff, 100000);
pointLight.position.set(50, 50, 50);
const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);

/* SCENE */
const scene = new THREE.Scene();
scene.add(torus, ...stars, pocoCube);
scene.add(pointLight);
scene.add(ambientLight);
scene.add(lightHelper);

// const gridHelper = new THREE.GridHelper(window.innerWidth, 200);
// scene.add(gridHelper);

// dark clouds
// const sceneBackground = new THREE.TextureLoader().load('dark-clouds.jpeg');
// scene.background = sceneBackground;

/* RENDERER */
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

function animate() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.02;

  pocoCube.rotation.y += 0.01;

  // orbitControls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

function moveCamera() {
  const scrollTop = document.documentElement.scrollTop;

  pocoCube.rotation.x += 0.01;
  pocoCube.rotation.y += 0.01;

  camera.position.x = scrollTop * 0.005;
  camera.position.y = scrollTop * 0.005;
  camera.position.z = scrollTop * 0.05;
}

window.addEventListener('scroll', moveCamera);

moveCamera();
animate();
