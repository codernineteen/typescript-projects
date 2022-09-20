import * as THREE from "three";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Basic components of 3d
//scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app") as HTMLCanvasElement,
});
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

//Creation of cube mesh
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshBasicMaterial({ color: "orangered" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Creation of line mesh
const lineMaterial = new THREE.LineBasicMaterial({ color: "white" });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.01;
};
animate();
