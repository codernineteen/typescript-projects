import * as THREE from "three";
import { scene, renderer, resizeRenderer } from "../module/renderer";
import { OrbitControls } from "three-orbitcontrols-ts";
//Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (evt) => {
  cursor.x = evt.clientX / window.innerWidth - 0.5; // -0.5 is for retargetting origin of coordinates because my initial cursor is located on (0,0)
  cursor.y = 0.5 - evt.clientY / window.innerHeight;
  console.log(cursor.x, cursor.y);
});

//light
{
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1.5, 4, 5);
  scene.add(light);
}

//cube generation
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: "orange" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Detail of PerspectiveCamera
//Description of Parameters of camera
//1. Field of View : Degree of sight range, usaully the angles are radian format in three.js, but we use degree for FOV parameter
//2. Aspect ratio: The width of rendering divided by height
//3. near and far: Range of rendering(determine visible distance)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  100
);

//controls - orbit control
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

//Detail of Orthographic camera
//Parameters : left,right,top and bottom + two last paremters are near and far
//We specify distance of rendering of each parts by setting values
//Without aspectRatio multiplier, it will look squeezed square.
//The reason i gave aspectRatio to parameters is because we are in rectangle viewport now.

// const canvas = renderer.domElement;
// const aspectRatio = canvas.clientWidth / canvas.clientHeight;
// const camera = new THREE.OrthographicCamera(
//   -2 * aspectRatio,
//   2 * aspectRatio,
//   2,
//   -2,
//   0.5,
//   100
// );

camera.position.z = 4;

//animation
const animate = () => {
  requestAnimationFrame(animate);

  control.update();
  renderer.render(scene, camera);
  //custom camera position control
  //   camera.lookAt(cube.position);
  //   camera.position.  = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;

  if (resizeRenderer(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight; // this property is for Perspective camera
    camera.updateProjectionMatrix();
  }
};
animate();
