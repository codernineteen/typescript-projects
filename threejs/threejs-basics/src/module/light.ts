import * as THREE from "three";

const createDirectionalLight = (
  color: string,
  intensity: number,
  position: number[],
  scene: THREE.Scene
) => {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(position[0], position[1], position[2]);
  scene.add(light);
};

export { createDirectionalLight };
