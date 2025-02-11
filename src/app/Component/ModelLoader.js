import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"; // 디코딩 방식
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
import addLighting from "./Light";

// 모델 로드 
const loadModel = (scene, mixerRef, camera, renderer) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);
  addLighting(scene, renderer); 
  

  loader.load(
    "/models/model.gltf",
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.2, 1.2, 1.2); // 모델 크기
      model.position.set(0, 0, 0); // 모델 위치
      scene.add(model); 
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;  // 모델 그림자

        }
      });

      // 모델 애니메이션
      const mixer = new THREE.AnimationMixer(model); // 애니메이션 플레이어
      const runAction = gltf.animations.find((clip) => clip.name.trim().toLowerCase() === "run"); 
      const take01Action = gltf.animations.find((clip) => clip.name.trim().toLowerCase() === "take 01");
      let runClip, take01Clip;

      if (runAction) { 
        runClip = mixer.clipAction(runAction); 
        runClip.play();
      }

      if (take01Action) {
        take01Clip = mixer.clipAction(take01Action);
        take01Clip.setLoop(THREE.LoopOnce); // 애니메이션 반복
        take01Clip.clampWhenFinished = true; 
      }

      mixerRef.current = mixer;

      // 모델 클릭 이벤트
      const onClick = () => {
        if (!take01Clip || !runClip) return;

        runClip.fadeOut(0.2); // 부드러운 전환
        take01Clip.reset().fadeIn(0.2).play(); // 부드러운 재생

        const duration = take01Clip._clip.duration;
        setTimeout(() => {
          take01Clip.fadeOut(0.2);
          runClip.reset().fadeIn(0.2).play();
        }, duration * 1000);
      };

      window.removeEventListener("click", onClick);
      window.addEventListener("click", onClick);
    },
    undefined,
  );

  // 카메라 조작
  const controls = new OrbitControls(camera, renderer.domElement); 
  controls.enableDamping = true; // 카메라 부드럽게 이동
  controls.dampingFactor = 0.25; 
  controls.enableZoom = true; // 카메라 줌 허용
  controls.autoRotate = true; // 카메라 회전
  controls.autoRotateSpeed = 0.5; // 카메라 회전 속도
  controls.enablePan = false; // 카메라 시점 이동
  controls.enableRotate = true; 
  controls.minDistance = 1; // 카메라 최소 거리
  controls.maxDistance = 100; // 카메라 최대 거리
  controls.maxPolarAngle = Math.PI / 2; // 카메라 최대 각도
  controls.minPolarAngle = Math.PI / 3; // 카메라 최소 각도
  controls.target.set(0, 0, 0); // 카메라 시점

  const animateControls = () => {
    requestAnimationFrame(animateControls);
    controls.update();
  };
  animateControls();
};

export default loadModel;