import * as THREE from "three";

// 조명 설정
const addLighting = (scene) => {
  const light = new THREE.DirectionalLight(0xffffff, 5); // 조명 색상, 세기
  light.position.set(-5, 10, -7.5); // 조명 위치
  light.castShadow = true; // 그림자 생성
  light.shadow.mapSize.width = 1024; // 그림자 해상도

  scene.add(light); 

  // 바닥 설정
  const planeGeometry = new THREE.PlaneGeometry(50, 50); // 바닥면 크기
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 }); // 바닥 그림자 투명도
  const plane = new THREE.Mesh(planeGeometry, planeMaterial); // 바닥 재질 설정
  plane.rotation.x = -Math.PI / 2; // 바닥면 각도
  plane.position.y = -0.5; // 바닥면 위치
  plane.receiveShadow = true; // 바닥 그림자

  scene.add(plane);
};

export default addLighting;