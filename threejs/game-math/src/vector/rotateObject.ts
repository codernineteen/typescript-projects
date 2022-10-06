import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, scene, renderer } from "../module/renderer";
import { drawXYZAxis } from "../module/axis";
import { setLight } from "../module/light";
import "./style.css";

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

setLight("white", 1, [4.3, 7, 7], scene);
drawXYZAxis(scene);

const geo = new THREE.SphereGeometry(0.5, 20, 20);
const mat = new THREE.MeshStandardMaterial({
  color: "orange",
});
const sphere = new THREE.Mesh(geo, mat);
scene.add(sphere);
camera.position.set(10, 10, 10);

//Mathematics
const rotationObject = (elapsedTime: number, mesh: THREE.Mesh) => {
  const rotationSpeed = 5;
  const rotationRadius = 5;
  const rad = rotationSpeed * elapsedTime;
  mesh.position.x = rotationRadius * (Math.cos(rad) - Math.sin(rad));
  mesh.position.z = rotationRadius * (Math.cos(rad) + Math.sin(rad));
};

//Animation
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  rotationObject(elapsedTime, sphere);

  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
