import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, scene, renderer } from "../module/renderer";
import { drawXYZAxis } from "../module/axis";
import { setLight } from "../module/light";
import {
  descartesToPolar,
  polarToDescartes,
} from "../module/covertCoordinates";
import "./style.css";

//default setting
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
camera.position.set(10, 10, 10);
setLight("white", 1, [4.3, 7, 7], scene);
drawXYZAxis(scene);

//Geometry
const geo = new THREE.BoxGeometry(3, 3, 3, 10, 10);
const mat = new THREE.MeshStandardMaterial({
  color: "orange",
});
const cube = new THREE.Mesh(geo, mat);

scene.add(cube);

//Mathematics
const lerp = (a: number, b: number, r: number) => {
  return a + (b - a) * r;
};

const transformShapeToTornado = (elapsedTime: number) => {
  const rotateSpeed = 5;
  const angle = rotateSpeed * elapsedTime;

  const count = geo.attributes.position.count;

  for (let i = 0; i < count; i++) {
    let x = geo.attributes.position.getX(i);
    let y = geo.attributes.position.getY(i);

    const polarCoor = descartesToPolar(x, y);
    let ratio = polarCoor[0] / 10;
    let weight = lerp(1.5, 5.0, ratio);
    polarCoor[1] = angle * weight;
    const cartesianCoor = polarToDescartes(polarCoor[0], polarCoor[1]);
    geo.attributes.position.setX(i, cartesianCoor[0]);
    geo.attributes.position.setY(i, cartesianCoor[1]);
  }
};

//Animation
const clock = new THREE.Clock();
const animate = () => {
  geo.attributes.position.needsUpdate = true;

  const elapsedTime = clock.getElapsedTime();
  transformShapeToTornado(elapsedTime);

  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
