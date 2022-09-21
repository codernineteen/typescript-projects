import * as THREE from "three";
import { scene, camera, renderer } from "../module/renderer";
import "./design.css";

function main() {
  const resizeRenderer = (renderer: THREE.WebGLRenderer) => {
    const canvas = renderer.domElement;
    //handling hd-dpi depending on a type of device
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize =
      canvas.clientWidth !== width || canvas.clientHeight !== height;
    if (needResize) {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    return needResize;
  };

  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const aquaMaterial = new THREE.MeshPhongMaterial({ color: "aquamarine" });
  const cube = new THREE.Mesh(geometry, aquaMaterial);

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  scene.add(cube);

  const animateObject = () => {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;

    if (resizeRenderer(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    requestAnimationFrame(animateObject);
    renderer.render(scene, camera);
  };
  animateObject();
}

main();
