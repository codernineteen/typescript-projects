import * as THREE from "three";

//Canvas
const canvas = document.getElementById("app") as HTMLCanvasElement;
//scene - container box of mesh, camera and other similar things
const scene = new THREE.Scene();
//camera - perspective
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//renderer - integrate everything and make it visible on browser
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

export { scene, camera, renderer };
