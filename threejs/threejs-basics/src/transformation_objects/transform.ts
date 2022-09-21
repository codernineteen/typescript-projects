import * as THREE from "three";
import { scene, camera, renderer } from "../module/renderer";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "gray" });
const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

//Use group when you want to transform group of objects at the same time.
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "lightgrey" })
);
group.add(cube1);

camera.position.z = 5;
camera.position.y = 1;
camera.position.x = 1;

//[POSITION]
//mesh position(position is Vector3D class)
cubeMesh.position.set(0.7, -1.5, -1);
//Because position is a vector, we can get its length

/*
console.log(cubeMesh.position.length());
console.log(cubeMesh.position.distanceTo(camera.position)); //get length between cube and camera
*/

/*
cubeMesh.position.normalize(); // make vector length one
*/

//!THIS SO USEFUL!
//axes helper: axes helper draw lines of three axes on our scene
//Recap: all the Object3D class needs to be added to scene
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//[SCALE]
cubeMesh.scale.set(1.5, 1.5, 1.5);

//[ROTATION]
// There are two rotation techniques : rotation and quaternion
let direction = "pos";
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  camera.lookAt(cubeMesh.position);
  // When we rotate something, the order of rotation of axis is really important
  cubeMesh.rotation.y += 0.05;
  cubeMesh.rotation.x += 0.05;
  cubeMesh.position.x += 0.01;

  if (cubeMesh.position.x === 2) {
    direction = "neg";
  }
  if (cubeMesh.position.x === 0) {
    direction = "pos";
  }

  if (direction === "pos") {
    cubeMesh.position.x += 0.02;
  } else {
    cubeMesh.position.x += 0.02;
  }
};

//We can change view of camera using 'lookAt'method

animate();
