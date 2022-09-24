import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { camera, scene, renderer } from "../module/renderer";
import "./style.css";
import * as dat from "dat.gui";
import gsap from "gsap";

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

const params = {
  color: 0xff0000,
  spin: () => {
    gsap.to(cube.rotation, {
      duration: 1,
      x: cube.rotation.x + Math.PI * 2,
      y: cube.rotation.y + Math.PI * 2,
    });
  },
};
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: params.color,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//There are many libraries to debug three.js ui
//1. dat.gui
const gui = new dat.GUI();
// position gui
gui.add(cube.position, "x", -3, 3, 0.01);
gui.add(cube.position, "y", -3, 3, 0.01);
gui.add(cube.position, "z", -3, 3, 0.01);

//visibility
gui.add(cube, "visible");
//wireframe
gui.add(material, "wireframe");
gui.addColor(params, "color").onChange(() => {
  material.color.set(params.color);
});
gui.add(params, "spin");

camera.position.z += 5;

const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
