import * as THREE from "three";

// 렌더러 초기화
const rendererInit = (mountRef, scene) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth / 2, window.innerHeight); // 렌더러 비율 설정
  renderer.setClearColor("#9dbbd5"); // 배경색 설정
  renderer.shadowMap.enabled = true; // 그림자 활성화
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 그림자 부드럽게 설정

  if (mountRef.current) {
    mountRef.current.appendChild(renderer.domElement);
  }

  return renderer;
};

export default rendererInit;