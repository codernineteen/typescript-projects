import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import "./style.css";

//rendering components
const canvas = document.getElementById("app") as HTMLCanvasElement;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  100
);
const renderer = new THREE.WebGLRenderer({ canvas });
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

{
  const light = new THREE.DirectionalLight("white", 1.5);
  light.position.set(0, 2, 3);
  scene.add(light);
}

const objects: THREE.Object3D[] = [];
//Without graph node, default properties will be changed as of each parents
const solarSystem = new THREE.Object3D();
const earthOrbit = new THREE.Object3D();
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;

const sphereGeometry = new THREE.SphereGeometry(1, 10, 10);

const sunMaterial = new THREE.MeshToonMaterial({ color: "orange" });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);

const earthMaterial = new THREE.MeshToonMaterial({
  color: 0x2233ff,
  emissive: 0x112244,
});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.position.x = 15;

const moonMaterial = new THREE.MeshToonMaterial({
  color: "lightgrey",
});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
//moonMesh.scale.set(0.5, 0.5, 0.5);

moonOrbit.add(moonMesh);

earthOrbit.add(moonOrbit);
earthOrbit.add(earthMesh);

solarSystem.add(sunMesh);
solarSystem.add(earthOrbit);

objects.push(solarSystem);
objects.push(earthMesh);
objects.push(moonMesh);

scene.add(solarSystem);

const animate = () => {
  requestAnimationFrame(animate);

  objects.forEach((el) => {
    el.rotation.y += 0.02;
  });

  control.update();
  renderer.render(scene, camera);
};
animate();
