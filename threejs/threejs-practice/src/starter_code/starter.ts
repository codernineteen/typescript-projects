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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "orange",
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z += 5;

const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
