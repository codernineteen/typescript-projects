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
const geo = new THREE.BoxGeometry(1, 1, 1, 10, 10);
const mat = new THREE.MeshStandardMaterial({
  color: "orange",
});
const cube = new THREE.Mesh(geo, mat);
scene.add(cube);

//Mathematics

//translate matrix
const translateObjectEqually = (distance: number) => {
  const translateMatrix = new THREE.Matrix4();
  const currentPosition = new THREE.Vector4(
    cube.position.x,
    cube.position.y,
    cube.position.z,
    1
  );
  translateMatrix.set(
    1,
    0,
    0,
    distance,
    0,
    1,
    0,
    distance,
    0,
    0,
    1,
    distance,
    0,
    0,
    0,
    1
  );
  const translateResult = currentPosition.applyMatrix4(translateMatrix);
  cube.position.set(translateResult.x, translateResult.y, translateResult.z);
};

//Animation
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  translateObjectEqually(elapsedTime / 1000);
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
