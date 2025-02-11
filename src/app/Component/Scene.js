import * as THREE from "three";
import rendererInit from "./Render"; 
import addLighting from "./Light";
import loadModel from "./ModelLoader"; 

// 씬 설정
const Scene = (mountRef, mixerRef) => {  
  if (!mountRef.current) return null; 
  const scene = new THREE.Scene();

  // 카메라 설정
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각 
    window.innerWidth / window.innerHeight, // 화면 종횡비 
    0.1, // 최소 시야 
    1000 // 최대 시야 
  );

  camera.position.set(-12, 0, 1); // 카메라 초기 위치 

  const renderer = rendererInit(mountRef, scene);

  addLighting(scene);  // 씬에 조명 추가

  loadModel(scene, mixerRef, camera, renderer);
  const clock = new THREE.Clock();

  // 애니메이션 루프 설정
  const animate = () => {
    requestAnimationFrame(animate); 
    const delta = clock.getDelta(); 
    if (mixerRef.current) mixerRef.current.update(delta); 
    renderer.render(scene, camera); 
  };
  animate(); 

  // 창 크기 조정 이벤트 핸들러
  const handleResize = () => {
    const width = window.innerWidth; // 가로 크기를 전체로 설정
    const height = window.innerHeight; // 현재 창 높이 유지
    renderer.setSize(width, height); // 렌더러 크기 조정
    camera.aspect = width / height; // 카메라 종횡비 
    camera.updateProjectionMatrix(); // 카메라 설정 
  };

  window.addEventListener("resize", handleResize);  // 이벤트 리스너 등록


  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  return () => {
    window.removeEventListener("resize", handleResize);
    if (mixerRef.current) mixerRef.current.stopAllAction(); // 애니메이션 정지
    renderer.dispose(); // 렌더러 메모리 해제
    while (scene.children.length > 0) { // 씬 내부 객체 정리
      scene.remove(scene.children[0]); // 씬의 자식 요소를 하나씩 제거
    }
  };
};

export default Scene;