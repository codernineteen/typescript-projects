import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app") as HTMLCanvasElement,
});
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);

//add cube to scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "white" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//create line material
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
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
};
animate();
