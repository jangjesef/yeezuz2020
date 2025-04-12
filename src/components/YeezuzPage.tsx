import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.img 
        src="/loading.png" 
        alt="Loading" 
        className="w-64 h-64"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{ left: '-100px', top: '-100px' }}
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0V30M0 15H30" stroke="white" strokeWidth="2"/>
      </svg>
    </div>
  );
};

const YeezuzPage = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Displays the loading animation for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted) {
        videoRef.current.play();
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'STORE', path: 'https://www.yeezuz2020.store/' },
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingSpinner />}
      </AnimatePresence>
      
      <div className="h-screen bg-black text-white overflow-hidden cursor-none font-sans flex flex-col justify-between">
        <CustomCursor />

        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/cherry.mp4" type="video/mp4" />
        </video>

        {/* Top Navigation */}
        <nav className="w-full p-4 flex justify-between items-center text-xs md:text-sm z-10">
          <div className="space-x-4 md:space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => window.location.href = item.path}
                className="hover:text-gray-300 transition-colors duration-300 bg-transparent border-none cursor-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
          <div className="flex space-x-4 md:space-x-6">
            <motion.button
              onClick={() => window.open("https://www.instagram.com/yeezuzboy/?hl=cs", "_blank")}
              className="hover:text-gray-300 bg-transparent border-none cursor-none"
              whileHover={{ scale: 1.05 }}
            >
              INSTAGRAM
            </motion.button>
            <motion.button
              onClick={() => window.location.href = "mailto:booking@yeezuz2020.com"}
              className="hover:text-gray-300 bg-transparent border-none cursor-none"
              whileHover={{ scale: 1.05 }}
            >
              BOOKING
            </motion.button>
          </div>
        </nav>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center flex-1">
          <motion.h1 
            className="text-5xl md:text-8xl font-bold mb-4 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            YEEZUZ2020
          </motion.h1>

          {/* Buttons, always visible */}
          <motion.div 
            className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-8 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              onClick={() => window.open("https://linktr.ee/yeezuz2020", "_blank")}
              className="text-lg md:text-xl hover:text-gray-300 bg-transparent border-none cursor-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LISTEN NOW
            </motion.button>
            <motion.button
              onClick={() => window.open("https://www.yeezuz2020.store/", "_blank")}
              className="text-lg md:text-xl hover:text-gray-300 bg-transparent border-none cursor-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              MERCHANDISE
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Unmute Button and Footer */}
        <div className="w-full p-4 flex justify-between items-center z-10">
          {/* Mobile UNMUTE Button */}
          <motion.button
            className="block md:hidden px-3 py-2 rounded-full border border-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 text-xs cursor-none"
            onClick={toggleMute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎵 {isMuted ? 'Play' : 'Pause'}
          </motion.button>

          {/* Desktop UNMUTE Button */}
          <motion.button
            className="hidden md:block px-3 py-2 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 text-xs md:text-sm cursor-none"
            onClick={toggleMute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? 'UNMUTE' : 'MUTE'} MUSIC
          </motion.button>

          {/* Footer */}
          <div className="text-xs md:text-sm">
            © 2024 YEEZUZ2020
          </div>
        </div>
      </div>
    </>
  );
};

export default YeezuzPage;
