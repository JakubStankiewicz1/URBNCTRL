import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './HelmetViewer.css';

// Model 3D hełmu z animacją rotacji
function HelmetModel({ animateTo, ...props }) {
  const { scene } = useGLTF('/helmet.glb');
  const helmetRef = useRef();
  const pivotRef = useRef();
  
  // Centrowanie modelu przy starcie
  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
    }
  }, [scene]);
  
  // Animacja płynnego obrotu modelu
  useFrame(() => {
    if (animateTo !== undefined && pivotRef.current) {
      const targetY = animateTo;
      const currentY = pivotRef.current.rotation.y;
      const diff = targetY - currentY;
      
      if (Math.abs(diff) > 0.01) {
        pivotRef.current.rotation.y += diff * 0.01;
      } else {
        pivotRef.current.rotation.y = targetY;
      }
    }
  });

  return (
    <group ref={pivotRef} rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <primitive 
        ref={helmetRef}
        object={scene} 
        {...props} 
        scale={[2.5, 2.2, 2.5]}
        position={[0, -1.2, 0]}
      />
    </group>
  );
}

const HelmetViewer = () => {
  // Stan komponentu
  const [rotated, setRotated] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [showHelmet, setShowHelmet] = useState(false);
  
  // Kąty rotacji (0 - przód, Math.PI/2 - bok)
  const normalY = 0;
  const sideY = Math.PI / 2;
  
  // Referencja do sceny
  const sceneRef = useRef();

  // Obsługa animacji po kliknięciu START
  const handleStart = () => {
    // 1. Ukryj przycisk
    setShowButton(false);
    
    // 2. Pokaż hełm
    setShowHelmet(true);
    
    // 3. Animuj zanikanie czarnego tła
    const fadeInterval = setInterval(() => {
      setOverlayOpacity(prev => {
        const newOpacity = prev - 0.05;
        if (newOpacity <= 0) {
          clearInterval(fadeInterval);
          // 4. Obróć hełm dopiero po zniknięciu tła
          setTimeout(() => setRotated(true), 300);
          return 0;
        }
        return newOpacity;
      });
    }, 30);
  };
  // Klasa dla overlaya zależna od stanu
  const overlayClass = `helmetViewerOverlay ${
    overlayOpacity > 0 ? 'helmetViewerOverlayVisible' : 'helmetViewerOverlayHidden'
  }`;

  return (
    <div className="helmetViewer">
      {/* Kontener z tłem i modelem 3D */}
      <div className="helmetViewerContainer">
        <Canvas
          ref={sceneRef}
          camera={{ position: [0, 0, 4], fov: 45 }}
          className="helmetViewerContainerCanvas"
        >
          {/* Oświetlenie sceny */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {/* Środowisko dla odbić światła */}
          <Environment preset="city" />
          
          {/* Model hełmu z animacją rotacji */}
          {showHelmet && <HelmetModel animateTo={rotated ? sideY : normalY} />}
        </Canvas>
      </div>
      
      {/* Nakładka czarna, która zanika po naciśnięciu START */}
      <div 
        className={overlayClass}
        style={{ opacity: overlayOpacity }}
      />      {/* Przycisk START widoczny na początku */}
      {showButton && (
        <div className="helmetViewerButtonContainer">
          {/* <h1 className="formula1-title">RACING HELMET</h1> */}
          {/* <p className="formula1-text">PROFESSIONAL GRADE FORMULA 1 HELMET</p> */}
          <div
            className="helmetViewerButtonContainerButton"
            onClick={handleStart}
          ><div href="" className='helmetViewerButtonContainerButtonBtn' >                
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {/* <span className="formula1-bold">START</span> */}
                {/* START */}
                <p className="helmetViewerButtonContainerButtonBtnText">
                    START
                </p>
            </div>
            {/* START */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HelmetViewer;
