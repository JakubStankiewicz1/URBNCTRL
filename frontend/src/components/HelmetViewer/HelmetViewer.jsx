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
  const [circleAnimation, setCircleAnimation] = useState({
    active: false,
    x: 0,
    y: 0,
    size: 0
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Kąty rotacji (0 - przód, Math.PI/2 - bok)
  const normalY = 0;
  const sideY = Math.PI / 2;
  
  // Referencja do sceny i przycisku
  const sceneRef = useRef();
  const buttonRef = useRef();
  // Obsługa animacji po kliknięciu START
  const handleStart = (e) => {
    if (isTransitioning) return; // Prevent multiple clicks
    
    setIsTransitioning(true);
    
    // Pobierz pozycję przycisku dla animacji koła
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    
    // Oblicz rozmiar koła aby pokryć cały ekran
    const maxDistance = Math.sqrt(
      Math.pow(Math.max(centerX, window.innerWidth - centerX), 2) +
      Math.pow(Math.max(centerY, window.innerHeight - centerY), 2)
    ) * 2;
    
    // 1. Rozpocznij animację przycisku (zmniejszenie i fade out)
    setShowButton(false);
    
    // 2. Rozpocznij animację koła po krótkiej przerwie
    setTimeout(() => {
      setCircleAnimation({
        active: true,
        x: centerX,
        y: centerY,
        size: 20
      });
      
      // Rozwijaj koło
      setTimeout(() => {
        setCircleAnimation(prev => ({
          ...prev,
          size: maxDistance
        }));
      }, 50);
      
    }, 200);
    
    // 3. Pokaż hełm gdy koło się rozwija
    setTimeout(() => {
      setShowHelmet(true);
    }, 800);
    
    // 4. Ukryj czarne tło
    setTimeout(() => {
      setOverlayOpacity(0);
    }, 1200);
    
    // 5. Zacznij zanikanie czerwonego koła
    setTimeout(() => {
      setCircleAnimation(prev => ({
        ...prev,
        active: false
      }));
    }, 1400);
    
    // 6. Uruchom rotację hełmu
    setTimeout(() => {
      setRotated(true);
      setIsTransitioning(false);
    }, 2000);
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
        </Canvas>      </div>
      
      {/* Animowane czerwone koło rozrastające się z przycisku */}
      <div 
        className="helmetViewerCircleOverlay"
        style={{
          top: circleAnimation.y,
          left: circleAnimation.x,
          width: circleAnimation.size,
          height: circleAnimation.size,
          opacity: circleAnimation.active ? 1 : 0,
          visibility: circleAnimation.size > 0 ? 'visible' : 'hidden'
        }}
      />
      
      {/* Nakładka czarna, która zanika po naciśnięciu START */}
      <div 
        className={overlayClass}
        style={{ opacity: overlayOpacity }}
      />      <div className="helmetViewerCircleOverlayLogo">
        <div className="helmetViewerCircleOverlayLogoDiv">
            Jakub Stankiewicz
        </div>

        {/* <div className="helmetViewerCircleOverlayLogoDivDivOne" /> */}
      </div>
      

      
      {/* Przycisk START widoczny na początku */}
      {showButton && (
        <div className="helmetViewerButtonContainer">
          {/* <h1 className="formula1-title">RACING HELMET</h1> */}
          {/* <p className="formula1-text">PROFESSIONAL GRADE FORMULA 1 HELMET</p> */}          <div
            className="helmetViewerButtonContainerButton"
            onClick={handleStart}
          >
            <div ref={buttonRef} className='helmetViewerButtonContainerButtonBtn' >
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
