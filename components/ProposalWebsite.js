'use client';
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const ProposalWebsite = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [scale, setScale] = useState(1);
  const [currentGif, setCurrentGif] = useState("https://media.tenor.com/p_VEcmrBsLMAAAAj/manja.gif");
  const [message, setMessage] = useState("Will you be my girlfriend?");

  const noMessages = [
    { gif: "https://media.tenor.com/aV4ubnilNXEAAAAj/meme-mochi.gif", text: "Think carefully please 🥺" },
    { gif: "https://media.tenor.com/tzvzrz4famQAAAAj/couple-forgive-me.gif", text: "Please please think again 😢" },
    { gif: "https://media.tenor.com/3bDvSVpiwjoAAAAj/peach-goma-phone.gif", text: "Don't show attitude please! Just say yes! 🙈" }
  ];

  const handleNoButtonHover = (e) => {
    if (noCount >= 3) {
      // Get mouse position
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Get window dimensions
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate the opposite direction from the mouse
      let newX = noButtonPosition.x;
      let newY = noButtonPosition.y;
      
      // Move button away from mouse with some randomness
      const moveDistance = 100;
      const randomOffset = () => (Math.random() - 0.5) * 100;
      
      if (mouseX > noButtonPosition.x) {
        newX = Math.max(0, noButtonPosition.x - moveDistance + randomOffset());
      } else {
        newX = Math.min(windowWidth - 100, noButtonPosition.x + moveDistance + randomOffset());
      }
      
      if (mouseY > noButtonPosition.y) {
        newY = Math.max(0, noButtonPosition.y - moveDistance + randomOffset());
      } else {
        newY = Math.min(windowHeight - 40, noButtonPosition.y + moveDistance + randomOffset());
      }
      
      // Keep button within window bounds
      newX = Math.min(Math.max(0, newX), windowWidth - 100);
      newY = Math.min(Math.max(0, newY), windowHeight - 40);
      
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleNoClick = () => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    
    if (newCount <= 3) {
      setCurrentGif(noMessages[noCount].gif);
      setMessage(noMessages[noCount].text);
    }
  };

  const handleYesClick = async () => {
    setShowCelebration(true);
    setCurrentGif("https://media1.tenor.com/m/A4Lvk69JMJkAAAAd/mochi-cat.gif");
    setMessage("Yayyyy! I knew it! I love you! ❤️");
    
    const confetti = (await import('canvas-confetti')).default;
    
    const count = 5;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 100
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(200 * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(s => (s === 1 ? 1.1 : 1));
    }, 1000);

    // Initialize button position
    setNoButtonPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex flex-col items-center justify-center p-4 relative overflow-hidden"
      onMouseMove={noCount >= 3 ? handleNoButtonHover : undefined}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-400 opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${0.5 + Math.random()})`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${-Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 max-w-2xl w-full px-4">
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={currentGif} 
            alt="Cute proposal gif" 
            className="w-full max-w-xs md:max-w-md mx-auto h-auto aspect-square object-contain rounded-lg shadow-lg"
          />
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-red-600 mb-8">
          {message}
        </h1>
        
        <div className="space-y-4 mt-8 relative">
          <button
            onClick={handleYesClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full transform hover:scale-110 transition-transform duration-200 mx-2 text-sm md:text-base"
            style={{ transform: `scale(${scale})` }}
          >
            YES! 💖
          </button>
          
          <button
            onClick={handleYesClick}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full transform hover:scale-110 transition-transform duration-200 mx-2 text-sm md:text-base"
          >
            DAMN YES! 💝
          </button>
          
          {(!showCelebration) && (
            <button
              onClick={handleNoClick}
              className="bg-gray-500 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all duration-200 text-sm md:text-base"
              style={noCount >= 3 ? {
                position: 'fixed',
                left: noButtonPosition.x,
                top: noButtonPosition.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 50
              } : {}}
            >
              No 💔
            </button>
          )}
        </div>

        {showCelebration && (
          <div className="mt-8 animate-fadeIn">
            <div className="text-xl md:text-3xl text-pink-600 font-bold space-y-2">
              <p>🎉 Now you are stuck with me forever! 🎉</p>
              <p>❤️ I love you! ❤️</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ProposalWebsite;