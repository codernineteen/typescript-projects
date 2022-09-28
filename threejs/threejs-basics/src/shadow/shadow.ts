import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, scene, renderer } from "../module/renderer";
import * as dat from "dat.gui";
import "./style.css";
import { Sphere, TextureLoader } from "three";

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
const gui = new dat.GUI();

//Shadow (instead of using real time shadow, we can use baked shadow(static))
//we shouldn't use baked shadow to moving objects
//But if the distance between light and mesh is fixed, By attaching the baked shadow to object, we can move it altogether
//Activate shadow map first
renderer.shadowMap.enabled = true;
//change type of shadow map
renderer.shadowMap.type = THREE.PCFShadowMap; // less performant, but it looks fine

{
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const directionalLight = new THREE.DirectionalLight("white", 0.5);
  //(only point, spot, directional light support shadow )
  //Light stores shadow map so that we can change its length and width more realistically
  directionalLight.castShadow = true;
  directionalLight.position.set(4.3, 7, 7);
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  //Because light has a shadow camera to store shadow map , we can determine its near and far
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 30;
  //and also we can access in top, bottom, left, right because light camera is orthogonal cam
  //blur shadow
  directionalLight.shadow.radius = 10;

  const spotLight = new THREE.SpotLight("white", 0.4, 10, Math.PI * 0.3);
  spotLight.castShadow = true;
  spotLight.position.set(-4, 4, 0);
  spotLight.rotation.z = Math.PI * 0.5;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
  gui.add(directionalLight, "intensity", 0, 1, 0.01);
  gui.add(directionalLight.position, "x", -7, 7, 0.1);
  gui.add(directionalLight.position, "y", -7, 7, 0.1);
  gui.add(directionalLight.position, "z", -7, 7, 0.1);
  scene.add(directionalLight, ambientLight, spotLight);
}

{
  const geo = new THREE.PlaneGeometry(40, 40);
  const mat = new THREE.MeshStandardMaterial({
    color: "white",
  });
  const plane = new THREE.Mesh(geo, mat);
  plane.rotation.x = Math.PI * -0.5;
  plane.position.y = -3;
  //plane recieve shadow
  plane.receiveShadow = true;
  scene.add(plane);
}

const geo = new THREE.SphereGeometry(1, 20, 20);
const mat = new THREE.MeshStandardMaterial({
  color: "white",
});
const sphere = new THREE.Mesh(geo, mat);
//spherer cast shadow
sphere.castShadow = true;

gui.add(sphere.position, "y", -2, 30, 0.1);
scene.add(sphere);

camera.position.z += 5;

const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();
  sphere.position.x = Math.cos(elapsedTime) * 4;
  sphere.position.z = Math.sin(elapsedTime) * 4;
  control.update();
  renderer.render(scene, camera);
};
animate();
