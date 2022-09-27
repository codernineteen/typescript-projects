import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { camera, scene, renderer } from "../module/renderer";
import * as dat from "dat.gui";
import "./style.css";

camera.position.z += 10;
camera.fov = 45;

const gui = new dat.GUI();
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshPhongMaterial({ color: "white", side: THREE.DoubleSide })
);
plane.rotation.x = Math.PI * -0.5;
plane.position.y = -5;
scene.add(plane);

{
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: "orange",
    side: THREE.DoubleSide,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = 2;
  scene.add(cube);
}
{
  const sphereRadius = 1;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(
    sphereRadius,
    sphereWidthDivisions,
    sphereHeightDivisions
  );
  const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
  const mesh = new THREE.Mesh(sphereGeo, sphereMat);
  mesh.position.x = -2;
  scene.add(mesh);
}

const params = {
  color: 0xffffff,
  skyColor: 0xb1e1ff,
  groundColor: 0xb97a20,
};
// #1 Ambient light - result color will be (materialColor * light.color * light.intensity), no direction
const ambientLight = new THREE.AmbientLight(params.color, 1);

// #2 Hemispehre light - sky color and ground color
const hemisphereLight = new THREE.HemisphereLight(
  params.skyColor,
  params.groundColor,
  1
);

// #3 Directional light - represent the sun
const directionalLight = new THREE.DirectionalLight(params.color, 1);
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);

// To see what's going on directional light, we can use helper
const directionHelper = new THREE.DirectionalLightHelper(directionalLight);
gui.addColor(params, "color").onChange(() => {
  directionalLight.color.set(params.color);
});

//#4 - point light : a light sits at a point and shoots lights in all direction from that point.
const pointLight = new THREE.PointLight(params.color, 1);
scene.add(pointLight);
gui.add(pointLight, "intensity", 0, 2, 0.01);
gui.add(pointLight.position, "x", -10, 10);
gui.add(pointLight.position, "y", 0, 10);
gui.add(pointLight.position, "z", -10, 10);

gui.addColor(params, "skyColor").onChange(() => {
  hemisphereLight.color.set(params.skyColor);
});
gui.addColor(params, "color").onChange(() => {
  hemisphereLight.groundColor.set(params.groundColor);
});

const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
