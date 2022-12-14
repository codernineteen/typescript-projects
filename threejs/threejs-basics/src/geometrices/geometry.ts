import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { camera, scene, renderer } from "../module/renderer";
import "./style.css";

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

//Geometry has 6 parameters
//From first to third, width, height, depth which compose shape of Mesh
//and from fourth to sixth, it takes number of segments.(the triangles on each planes of geometry)
//const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

//BufferGeometry
//BufferGeometry is more efficient and optimized but not developer-friendly
const bufferGeometry = new THREE.BufferGeometry();
//we use Typed array(only one type of whole elements) to set buffer data
const positions = new Float32Array(1000);
for (let i = 0; i < 1000; i++) {
  positions[i] = (Math.random() - 0.5) * 4;
}
const positionAttribute = new THREE.BufferAttribute(positions, 3);
bufferGeometry.setAttribute("position", positionAttribute);

const material = new THREE.MeshBasicMaterial({
  color: "orange",
  wireframe: true, // To visualize segments on planes, we can use wireframe option
});
const cube = new THREE.Mesh(bufferGeometry, material);
scene.add(cube);

camera.position.z += 5;

const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
