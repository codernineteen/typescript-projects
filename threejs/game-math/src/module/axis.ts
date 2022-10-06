import * as THREE from "three";

const drawXYZAxis = (scene: THREE.Scene) => {
  const xMat = new THREE.LineBasicMaterial({
    color: "red",
  });
  const yMat = new THREE.LineBasicMaterial({
    color: "green",
  });
  const zMat = new THREE.LineBasicMaterial({
    color: "blue",
  });
  const xPoints = [],
    zPoints = [],
    yPoints = [];
  xPoints.push(new THREE.Vector3(-100, 0, 0));
  xPoints.push(new THREE.Vector3(100, 0, 0));
  yPoints.push(new THREE.Vector3(0, -100, 0));
  yPoints.push(new THREE.Vector3(0, 100, 0));
  zPoints.push(new THREE.Vector3(0, 0, -100));
  zPoints.push(new THREE.Vector3(0, 0, 100));
  const xLine = new THREE.BufferGeometry().setFromPoints(xPoints);
  const yLine = new THREE.BufferGeometry().setFromPoints(yPoints);
  const zLine = new THREE.BufferGeometry().setFromPoints(zPoints);

  const xAxis = new THREE.Line(xLine, xMat);
  const yAxis = new THREE.Line(yLine, yMat);
  const zAxis = new THREE.Line(zLine, zMat);

  scene.add(xAxis, yAxis, zAxis);
};

export { drawXYZAxis };
