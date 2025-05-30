import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Ultra smooth position update with RAF
    const updateCursorPosition = () => {
      if (cursor) {
        cursor.style.left = `${positionRef.current.x}px`;
        cursor.style.top = `${positionRef.current.y}px`;
      }
      requestAnimationFrame(updateCursorPosition);
    };

    const updatePosition = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      cursor.classList.add('hover');
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      cursor.classList.remove('hover');
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      cursor.classList.add('click');
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
      cursor.classList.remove('click');
    };

    // Start the smooth animation loop
    updateCursorPosition();

    // Add event listeners
    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Add hover effects to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [onclick]');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
        el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      });
    };

    // Initial setup and observer for dynamic content
    addHoverListeners();
    
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        left: '0px',
        top: '0px',
      }}
    />
  );
};

export default CustomCursor;
