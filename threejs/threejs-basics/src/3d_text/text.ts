import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { camera, scene, renderer } from "../module/renderer";
import "./style.css";

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

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

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load(
  "/assets/textures/matcap/AA526C_EAA6C9_DC88AF_D17BA0.png"
);

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Chiara Gadda", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelSize: 0.03,
    bevelThickness: 0.03,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  //const normalMaterial = new THREE.MeshNormalMaterial();
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  //To move text mesh to center of the scene, we will use bounding
  //Three.js uses sphere bounding by default, but in here we gonna use box bounding
  // textGeometry.computeBoundingBox(); //compute current box bounding. it will point to left bottom corner of the text geometry
  // const boundingBox = textGeometry.boundingBox as THREE.Box3;
  // textGeometry.translate(
  //   -(boundingBox.max.x - 0.02) * 0.5, //move as much as bevel size first
  //   -(boundingBox.max.y - 0.02) * 0.5, //move as much as bevel size first
  //   -(boundingBox.max.z - 0.03) * 0.5
  // );
  // textGeometry.computeBoundingBox(); // recalculate geometry

  //Instead of reorganizing mesh's position, we can just use simple method.
  textGeometry.center();
  scene.add(textMesh);

  const heartGeometry = createHeartGeometry();

  for (let i = 0; i < 500; i++) {
    const heartMesh = new THREE.Mesh(heartGeometry, textMaterial);
    heartMesh.scale.set(0.08, 0.08, 0.08);
    heartMesh.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30
    );
    heartMesh.rotation.set(
      Math.random() * 360,
      Math.random() * 360,
      Math.random() * 360
    );
    scene.add(heartMesh);
  }
});

camera.position.z += 5;

const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
