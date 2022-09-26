import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { camera, scene, renderer } from "../module/renderer";
import { createDirectionalLight } from "../module/light";
import * as dat from "dat.gui";
import "./style.css";

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

window.addEventListener("resize", () => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  //update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(width, height);
  //remove blurry on mesh by modifying pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

createDirectionalLight("white", 1, [-1, 3, -2], scene);
createDirectionalLight("white", 1, [2, 3, 2], scene);

const textureLoader = new THREE.TextureLoader(); //create one texture loader
//and use it to load textures
const colorTexture = textureLoader.load(
  "/assets/textures/wooden-harringbon-texture/Substance_Graph_BaseColor.jpg"
);
const heightTexture = textureLoader.load(
  "/assets/textures/wooden-harringbon-texture/Substance_Graph_Height.jpg"
);
const normalTexture = textureLoader.load(
  "/assets/textures/wooden-harringbon-texture/Substance_Graph_Normal.jpg"
);
const roughnessTexture = textureLoader.load(
  "/assets/textures/wooden-harringbon-texture/Substance_Graph_Roughness.jpg"
);
const ambientOcclusionTexture = textureLoader.load(
  "/assets/textures/wooden-harringbon-texture/Substance_Graph_AmbientOcclusion.jpg"
);

const cube = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const sphere = new THREE.SphereGeometry(1, 20, 20);
const torus = new THREE.TorusGeometry(0.5, 0.3, 20, 20);
// const material = new THREE.MeshBasicMaterial({
//   map: colorTexture,
// });
//[Properties of material]
//material.color = new THREE.Color("orangered");
//material.wireframe = true;
//material.opacity = 0.5;
//material.transparent = true;

// Normal is an information that includes directions of the outside of material face
// const material = new THREE.MeshNormalMaterial();

// Phong material reflects light
//const material = new THREE.MeshPhongMaterial({ map: colorTexture });

// Standard material uses PBR
const material = new THREE.MeshStandardMaterial({ map: colorTexture });
material.aoMap = ambientOcclusionTexture;
material.roughnessMap = roughnessTexture;
material.normalMap = normalTexture;
material.normalScale.set(1, 1);

const cubeMesh = new THREE.Mesh(cube, material);
cubeMesh.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeMesh.geometry.attributes.uv.array, 2)
);
const sphereMesh = new THREE.Mesh(sphere, material);
const torusMesh = new THREE.Mesh(torus, material);
torusMesh.position.set(3, 0, 0);
sphereMesh.position.set(-3, 0, 0);
scene.add(cubeMesh, sphereMesh, torusMesh);

const gui = new dat.GUI();
gui.add(material, "roughness", 0, 1, 0.001);
gui.add(material, "metalness", 0, 1, 0.001);

camera.position.z += 3;

const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  torusMesh.rotation.x = 0.2 * elapsedTime;
  torusMesh.rotation.y = 0.2 * elapsedTime;
  sphereMesh.rotation.x = 0.2 * elapsedTime;
  sphereMesh.rotation.y = 0.2 * elapsedTime;
  cubeMesh.rotation.x = 0.2 * elapsedTime;
  cubeMesh.rotation.y = 0.2 * elapsedTime;

  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
