import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Mascot = () => {
  const containerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Eye tracking
  const eyeX = useTransform(x, [0, windowSize.width], [-15, 15]);
  const eyeY = useTransform(y, [0, windowSize.height], [-10, 10]);
  
  // Body tilt
  const rotateX = useTransform(y, [0, windowSize.height], [10, -10]);
  const rotateY = useTransform(x, [0, windowSize.width], [-10, 10]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Main body - Abstract robot/alien character */}
        <div className="relative w-64 h-80 md:w-80 md:h-96">
          {/* Glow effect behind */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl opacity-50"
            style={{
              background: 'radial-gradient(circle, #8B5CF6 0%, #EC4899 50%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Head/Face container */}
          <div className="relative z-10">
            {/* Main face shape */}
            <motion.div 
              className="relative w-48 h-56 md:w-56 md:h-64 mx-auto rounded-[40%] overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)',
                boxShadow: '0 0 60px rgba(139, 92, 246, 0.3), inset 0 0 60px rgba(0,0,0,0.5)',
                border: '2px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              {/* Face grid pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              
              {/* Eyes container */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-8 md:gap-10">
                {/* Left eye */}
                <motion.div 
                  className="relative w-12 h-16 md:w-14 md:h-20 rounded-full overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #1e1e3f 0%, #0a0a15 100%)',
                    boxShadow: 'inset 0 0 20px rgba(139, 92, 246, 0.5)',
                    border: '2px solid rgba(139, 92, 246, 0.4)',
                  }}
                >
                  {/* Eye glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
                  {/* Pupil */}
                  <motion.div
                    className="absolute w-5 h-5 md:w-6 md:h-6 rounded-full"
                    style={{
                      x: eyeX,
                      y: eyeY,
                      left: '50%',
                      top: '50%',
                      translateX: '-50%',
                      translateY: '-50%',
                      background: 'radial-gradient(circle, #EC4899 0%, #8B5CF6 100%)',
                      boxShadow: '0 0 20px #EC4899, 0 0 40px #8B5CF6',
                    }}
                  >
                    {/* Pupil highlight */}
                    <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white opacity-80" />
                  </motion.div>
                </motion.div>
                
                {/* Right eye */}
                <motion.div 
                  className="relative w-12 h-16 md:w-14 md:h-20 rounded-full overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #1e1e3f 0%, #0a0a15 100%)',
                    boxShadow: 'inset 0 0 20px rgba(139, 92, 246, 0.5)',
                    border: '2px solid rgba(139, 92, 246, 0.4)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
                  <motion.div
                    className="absolute w-5 h-5 md:w-6 md:h-6 rounded-full"
                    style={{
                      x: eyeX,
                      y: eyeY,
                      left: '50%',
                      top: '50%',
                      translateX: '-50%',
                      translateY: '-50%',
                      background: 'radial-gradient(circle, #EC4899 0%, #8B5CF6 100%)',
                      boxShadow: '0 0 20px #EC4899, 0 0 40px #8B5CF6',
                    }}
                  >
                    <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white opacity-80" />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Mouth - subtle line */}
              <motion.div 
                className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)',
                }}
                animate={{
                  scaleX: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Antenna/Horn decorations */}
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-12 rounded-full"
              style={{
                background: 'linear-gradient(180deg, #8B5CF6, transparent)',
              }}
              animate={{ height: [48, 56, 48] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"
                animate={{
                  boxShadow: ['0 0 10px #8B5CF6', '0 0 30px #8B5CF6', '0 0 10px #8B5CF6'],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Side decorations */}
            <motion.div
              className="absolute top-20 -left-4 w-8 h-2 rounded-full bg-accent/50"
              animate={{ x: [-5, 0, -5], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-24 -left-6 w-12 h-2 rounded-full bg-primary/50"
              animate={{ x: [-8, 0, -8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="absolute top-20 -right-4 w-8 h-2 rounded-full bg-accent/50"
              animate={{ x: [5, 0, 5], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-24 -right-6 w-12 h-2 rounded-full bg-primary/50"
              animate={{ x: [8, 0, 8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
          </div>
          
          {/* Floating particles around mascot */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? '#8B5CF6' : '#EC4899',
                top: `${20 + i * 15}%`,
                left: i % 2 === 0 ? '-10%' : '110%',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
