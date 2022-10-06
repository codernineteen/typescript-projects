import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, scene, renderer } from "../module/renderer";
import * as dat from 'dat.gui';
import "./style.css";

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
const gui = new dat.GUI();

{
    const light = new THREE.DirectionalLight("white", 0.5);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  
    light.position.set(4.3, 7, 7);
    gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
    gui.add(light, "intensity", 0, 1, 0.01);
    gui.add(light.position, "x", -7, 7, 0.1);
    gui.add(light.position, "y", -7, 7, 0.1);
    gui.add(light.position, "z", -7, 7, 0.1);
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

const createHeartGeometry = () => {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
  
    const extrudeSettings = {
      steps: 2, // ui: steps
      depth: 2, // ui: depth
      bevelEnabled: true, // ui: bevelEnabled
      bevelThickness: 1, // ui: bevelThickness
      bevelSize: 1, // ui: bevelSize
      bevelSegments: 2, // ui: bevelSegments
    };
  
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    return geometry;
};

const geometry = createHeartGeometry();
const material = new THREE.MeshStandardMaterial({
  color: "red",
});
const heart = new THREE.Mesh(geometry, material);
heart.rotation.x = 40.6;
heart.position.y = 10;

scene.add(heart);

camera.position.z += 40;

//Mathematics
const lerp = (a:number,b:number,r:number) => {
    return a+(b-a) * r;
}

const beat = (elapsedTime:number, mesh: THREE.Mesh) => {
    let duration = 0.5;
    elapsedTime %= duration;
    let currentRad = (elapsedTime/duration) * Math.PI * 2;
    let alpha = (Math.sin(currentRad) + 1) * 0.5; // For linear interoperation, limit the sin range between 0 and 1;

    let scale = lerp(0.75, 0.85, alpha);
    mesh.scale.set(scale,scale,scale)
}


const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  beat(elapsedTime, heart);
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
