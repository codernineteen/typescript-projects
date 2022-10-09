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

//environment
setLight("white", 1, [4.3, 7, 7], scene);
drawXYZAxis(scene);

//Geometry
const geo = new THREE.PlaneGeometry(1, 1, 10, 10);
const mat = new THREE.MeshStandardMaterial({
  color: "orange",
});
const plane = new THREE.Mesh(geo, mat);
plane.position.set(0.5, 0.5, 0);
plane.matrixAutoUpdate = true;
scene.add(plane);

//Mathematics

//scale up matrix
const scaleRatio = 3;
const scaleUpMatrix = new THREE.Matrix4();
scaleUpMatrix.set(
  scaleRatio,
  0,
  0,
  0,
  0,
  scaleRatio,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1
);
plane.matrix.makeScale(3, 3, 1);
console.log(plane.matrix);

//Animation
const animate = () => {
  requestAnimationFrame(animate);
  plane.updateMatrix();
  control.update();
  renderer.render(scene, camera);
};
animate();
