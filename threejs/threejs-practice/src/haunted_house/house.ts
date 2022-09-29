import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, scene, renderer } from "../module/renderer";
import * as dat from "dat.gui";
import "./style.css";

//1 unit === 1 meter

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
const gui = new dat.GUI();

{
  const light = new THREE.DirectionalLight("white", 0.5);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  light.position.set(4.3, 7, 7);
  gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
  gui.add(light, "intensity", 0, 1, 0.01);
  gui.add(light.position, "x", -7, 7, 0.1);
  gui.add(light.position, "y", -7, 7, 0.1);
  gui.add(light.position, "z", -7, 7, 0.1);
  scene.add(light, ambientLight);
}

{
  const geo = new THREE.PlaneGeometry(40, 40);
  const mat = new THREE.MeshStandardMaterial({
    color: "yellowgreen",
  });
  const floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = Math.PI * -0.5;
  floor.position.y = -3;
  scene.add(floor);
}

//house
{
  const house = new THREE.Group();
}

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

camera.position.z += 5;

const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
