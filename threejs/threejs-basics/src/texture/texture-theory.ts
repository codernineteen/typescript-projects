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

//Topic: what is texture?
//Texture determines the appearance of specific meshs like roughness, metalness and so on
//We also can create our own texture following PBR rule(PBR : Physically Based rendering)
//To apply texture on our mesh, we need to follow few steps

//1. Load image
//vanilla js way
const image = new Image();
const texture1 = new THREE.Texture(image);
image.addEventListener("load", () => {
  texture1.needsUpdate = true;
});
image.src =
  "/assets/textures/wooden-harringbon-texture/Substance_Graph_BaseColor.jpg";

//2. use three.js` s texture loader
const loadingMangager = new THREE.LoadingManager(); //Loading manager keeps track of loaded and pending data
//and we can specify a function for each states
loadingMangager.onStart = () => {
  console.log("onStart");
};
loadingMangager.onLoad = () => {
  console.log("onLoad");
};
loadingMangager.onProgress = () => {
  console.log("onProgress");
};
loadingMangager.onError = () => {
  console.log("onError");
};
const textureLoader = new THREE.TextureLoader(loadingMangager); //create one texture loader
//and use it to load textures
const colorTexture = textureLoader.load(
  "/assets/textures/wooden-harringbon-texture/Substance_Graph_BaseColor.jpg"
);
// const heightTexture = textureLoader.load(
//   "/assets/textures/wooden-harringbon-texture/Substance_Graph_Height.jpg"
// );
// const normalTexture = textureLoader.load(
//   "/assets/textures/wooden-harringbon-texture/Substance_Graph_Normal.jpg"
// );
// const roughnessTexture = textureLoader.load(
//   "/assets/textures/wooden-harringbon-texture/Substance_Graph_Roughness.jpg"
// );
// const ambientOcclusionTexture = textureLoader.load(
//   "/assets/textures/wooden-harringbon-texture/Substance_Graph_AmbientOcclusion.jpg"
// );
//we can transform texture by modifying repeat,offset and rotation property
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 2;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

//There are two ways of fixing our texture size according to distance between camera and mesh
colorTexture.generateMipmaps = false; // For better performance, if we don't use mipmapping in our texture, it's better to turn off the process
colorTexture.minFilter = THREE.NearestFilter; //When it moving far away
colorTexture.magFilter = THREE.NearestFilter; //when it getting close

//Three crucial considerations before loading texture
//1. wegiht : .jpg - lighter, .png - heavier
//2. resolution(size of texture) // sending texture -> GPU -> GPU has its limitation, Reduce the size of texture amap
//3. data: e.g. jpg doesn't support transparency, normal map is usually png format
const geometry = new THREE.BoxGeometry(1, 1, 1);
//[UV unwrapping]
//Each vertex of geometry will have XY-Coordinate on a flat plane
//So our texture will be transformed by the coordinate of vertices
//console.log(geometry.attributes.uv); - Check the uv coordinates of box geometry

const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(1, 1, 1);

const animate = () => {
  requestAnimationFrame(animate);
  control.update();
  renderer.render(scene, camera);
};
animate();
