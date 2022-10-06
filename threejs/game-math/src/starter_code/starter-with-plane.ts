import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, scene, renderer } from "../module/renderer";
import "./style.css";

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

{
  const light = new THREE.DirectionalLight("white", 0.5);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  light.position.set(4.3, 7, 7);
  scene.add(light, ambientLight);
}

{
  const geo = new THREE.PlaneGeometry(40, 40);
  const mat = new THREE.MeshStandardMaterial({
    color: "white",
  });
  const plane = new THREE.Mesh(geo, mat);
  plane.rotation.x = Math.PI * -0.5;
  plane.position.y = -3;
  scene.add(plane);
}

{
  const geo = new THREE.SphereGeometry(1, 20, 20);
  const mat = new THREE.MeshStandardMaterial({
    color: "white",
  });
  const sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);
}


camera.position.z += 5;

const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
