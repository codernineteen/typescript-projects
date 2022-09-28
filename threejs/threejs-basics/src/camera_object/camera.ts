import * as THREE from "three";
import { scene, renderer, resizeRenderer } from "../module/renderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import "./style.css";

const gui = new dat.GUI();
const canvas = renderer.domElement;
//Detail of PerspectiveCamera
//Description of Parameters of camera
//1. Field of View : Degree of sight range, usaully the angles are radian format in three.js, but we use degree for FOV parameter
//2. Aspect ratio: The width of rendering divided by height
//3. near and far: Range of rendering(determine visible distance)
//cam1
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  50
);
//To observe frustrum of camera
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

const view1Elem = document.querySelector("#view1") as HTMLElement;
const control = new OrbitControls(camera, view1Elem);

//cam2
const camera2 = new THREE.PerspectiveCamera(
  60, // fov
  2, // aspect
  0.1, // near
  500 // far
);
camera2.position.set(40, 10, 30);
camera2.lookAt(0, 5, 0);
const view2Elem = document.querySelector("#view2") as HTMLElement;
const controls2 = new OrbitControls(camera2, view2Elem);
controls2.target.set(0, 5, 0);
controls2.update();

function setScissorForElement(elem) {
  const canvasRect = canvas.getBoundingClientRect();
  const elemRect = elem.getBoundingClientRect();

  // compute a canvas relative rectangle
  const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
  const left = Math.max(0, elemRect.left - canvasRect.left);
  const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
  const top = Math.max(0, elemRect.top - canvasRect.top);

  const width = Math.min(canvasRect.width, right - left);
  const height = Math.min(canvasRect.height, bottom - top);

  // setup the scissor to only render to that part of the canvas
  const positiveYUpBottom = canvasRect.height - bottom;
  renderer.setScissor(left, positiveYUpBottom, width, height);
  renderer.setViewport(left, positiveYUpBottom, width, height);

  // return the aspect
  return width / height;
}

//light
{
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1.5, 4, 5);
  scene.add(light);
}

{
  const color = "lightgrey";
  const planeGeometry = new THREE.PlaneGeometry(50, 50);
  const planeMaterial = new THREE.MeshPhongMaterial({ color });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotation.x = Math.PI * -0.5;
  planeMesh.position.y = -5;
  scene.add(planeMesh);
}

//cube generation
{
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: "orange" });
  const cube = new THREE.Mesh(geometry, material);
  camera.lookAt(cube.position);
  scene.add(cube);
}

//check how near and far works
gui.add(camera, "fov", 10, 150, 1);
gui.add(camera, "near", 0.1, 10, 0.1);
gui.add(camera, "far", 0.1, 50, 0.1);

//controls - orbit control
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
  {
    const aspect = setScissorForElement(view1Elem);

    // adjust the camera for this aspect
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    cameraHelper.update();

    // don't draw the camera helper in the original view
    cameraHelper.visible = false;
    scene.background = new THREE.Color("black");

    // render
    renderer.render(scene, camera);
  }

  // render from the 2nd camera
  {
    const aspect = setScissorForElement(view2Elem);

    // adjust the camera for this aspect
    camera2.aspect = aspect;
    camera2.updateProjectionMatrix();

    // draw the camera helper in the 2nd view
    cameraHelper.visible = true;
    scene.background = new THREE.Color(0x000040);

    renderer.render(scene, camera2);
  }

  requestAnimationFrame(animate);
};
animate();
