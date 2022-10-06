import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, scene, renderer } from "../module/renderer";
import { drawXYZAxis } from "../module/axis";
import { setLight } from "../module/light";
import "./style.css";

//default setting
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
camera.position.z += 5;
setLight("white", 1, [4.3, 7, 7], scene);
drawXYZAxis(scene);

//Geometry
const geo = new THREE.SphereGeometry(1, 20, 20);
const mat = new THREE.MeshStandardMaterial({
  color: "orange",
});
const sphere = new THREE.Mesh(geo, mat);
scene.add(sphere);

//Mathematics

//Animation
const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
