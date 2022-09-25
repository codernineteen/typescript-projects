import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { camera, scene, renderer } from "../module/renderer";
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
const material = new THREE.MeshBasicMaterial({
  color: "orange",
});
const cubeMesh = new THREE.Mesh(cube, material);
const sphereMesh = new THREE.Mesh(sphere, material);
const torusMesh = new THREE.Mesh(torus, material);
torusMesh.position.set(3, 0, 0);
sphereMesh.position.set(-3, 0, 0);
scene.add(cubeMesh, sphereMesh, torusMesh);

camera.position.z += 5;

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
