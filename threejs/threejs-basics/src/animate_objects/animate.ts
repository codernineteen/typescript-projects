import * as THREE from "three";
import { scene, camera, renderer } from "../module/renderer";
import gsap from "gsap";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "aquamarine" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;

//requestAnimationFrame is a recursive function. This calls given function in every next frame
//[How to fix frame rate]
//1. To fix our frame rate, we can use delta(current timestamp - next timestampe)
//2. Or use Clock which is three.js own solution
//3. or use third-party library like: GSAP 'npm install --save gsap@3.5.1'

// let time = Date.now();
// const clock = new THREE.Clock();
gsap.to(cube.position, { duration: 1, delay: 1, x: 2 });
gsap.to(cube.position, { duration: 1, delay: 2, x: 0 });

const animateObject = () => {
  //   const curTime = Date.now();
  //   const Delta = curTime - time;
  //   time = curTime;

  //   const elapsedTime = clock.getElapsedTime();
  //   cube.position.x = Math.sin(elapsedTime);
  //   cube.position.y = Math.cos(elapsedTime);

  //camera.lookAt(cube.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animateObject);
};

animateObject();
