import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { camera, scene, renderer } from "../module/renderer";
import "./style.css";

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load(
  "/assets/textures/matcap/161B1F_C7E0EC_90A5B3_7B8C9B.png"
);

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello World !", {
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

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 500; i++) {
    const donutMesh = new THREE.Mesh(donutGeometry, textMaterial);
    donutMesh.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30
    );
    donutMesh.rotation.set(
      Math.random() * 360,
      Math.random() * 360,
      Math.random() * 360
    );
    scene.add(donutMesh);
  }
});

camera.position.z += 5;

const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
