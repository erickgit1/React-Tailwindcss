import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Clock, Music } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import ReactPlayer from 'react-player/youtube';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date() - +new Date('2025-06-23T17:00:00');
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(difference / (1000 * 60 * 60) % 24),
        minutes: Math.floor(difference / 1000 / 60 % 60),
        seconds: Math.floor(difference / 1000 % 60)
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  const formatTime = time => {
    return time < 10 ? `0${time}` : time;
  };
  return <div className="flex justify-center gap-4 md:gap-8">
      {Object.entries(timeLeft).map(([interval, value]) => <div key={interval} className="text-center">
          <div className="text-4xl md:text-6xl font-bold text-white bg-white/10 p-4 rounded-lg">
            {formatTime(value)}
          </div>
          <p className="text-sm md:text-base text-pink-300 mt-2 capitalize">{interval}</p>
        </div>)}
    </div>;
};

const CelebrationSite = () => {
  const images = ["https://horizons-cdn.hostinger.com/589c1c13-0778-41f1-9ad8-8a0f3fb79a3d/22b94ad24131d69cb17441029a2b4389.jpg", "https://horizons-cdn.hostinger.com/589c1c13-0778-41f1-9ad8-8a0f3fb79a3d/8cfa811721c852defa98e02b4e7d431f.jpg", "https://horizons-cdn.hostinger.com/589c1c13-0778-41f1-9ad8-8a0f3fb79a3d/f641b1eb15ec80234d546191d0a6f61f.jpg", "https://horizons-cdn.hostinger.com/589c1c13-0778-41f1-9ad8-8a0f3fb79a3d/6e46eccd47778773e8d33056739c01ab.jpg", "https://horizons-cdn.hostinger.com/589c1c13-0778-41f1-9ad8-8a0f3fb79a3d/516cd877377f9a5bce4298a1783dde2c.jpg"];
  
  return <div className="min-h-screen bg-black text-white overflow-hidden">
      <div style={{ display: 'none' }}>
        <ReactPlayer 
            url="https://www.youtube.com/watch?v=VWRkQARH-9o"
            playing={true}
            loop={true}
            volume={0.5}
            width="0"
            height="0"
        />
      </div>

      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute text-pink-500 opacity-30" initial={{
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50
      }} animate={{
        y: -50,
        x: Math.random() * window.innerWidth
      }} transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "linear",
        delay: Math.random() * 5
      }}>
            <Heart className="w-6 h-6" />
          </motion.div>)}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <motion.div initial={{
        opacity: 0,
        scale: 0.5
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 1,
        ease: "easeOut"
      }} className="text-center w-full max-w-5xl mx-auto">
          <motion.h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-4" initial={{
          y: -50,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.5,
          duration: 0.8
        }}>
            Beatriz & Erick
          </motion.h1>

          <motion.div className="flex items-center justify-center gap-4 mb-12" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1,
          duration: 0.8
        }}>
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-xl md:text-2xl font-semibold text-pink-300">Feliz 3 Meses amor!</span>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            <motion.section initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1.5,
            duration: 0.8
          }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3"><Clock className="text-pink-400" /> Nosso Início</h2>
              <Countdown />
            </motion.section>

            <motion.section initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 2.0,
            duration: 0.8
          }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3"><Heart className="text-pink-400" /> Nosso Amor</h2>
              <Carousel className="w-full max-w-xl mx-auto" opts={{
              loop: true
            }}>
                <CarouselContent>
                  {images.map((src, index) => <CarouselItem key={index}>
                      <div className="p-1">
                        <img src={src} alt={`Momento especial ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-lg border-2 border-pink-500/50" />
                      </div>
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious className="text-white bg-black/50 hover:bg-pink-500/80" />
                <CarouselNext className="text-white bg-black/50 hover:bg-pink-500/80" />
              </Carousel>
            </motion.section>

            <motion.section initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 2.5,
            duration: 0.8
          }} className="w-full max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3"><Music className="text-purple-400" /> Para Sempre Com Você</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl border-2 border-purple-500/50 mb-8">
                 <ReactPlayer
                    className="react-player"
                    url="https://www.youtube.com/watch?v=is4zT3bIuFk"
                    width="100%"
                    height="100%"
                    controls={true}
                />
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-pink-500/30">
                <p className="text-base md:text-lg text-gray-200 leading-relaxed">Meu amor, cada segundo ao seu lado é um presente. Nesses três meses, você transformou meu mundo em um lugar mais brilhante e cheio de amor. Esta música é só um pequeno lembrete de tudo que eu sinto e de tudo que eu quero viver com você: para sempre. Você é minha melodia favorita, meu porto seguro, meu amor ate amo muito muitooo.</p>
                <p className="text-lg md:text-xl text-pink-300 font-semibold mt-4">Te amo infinitamente, minha Princesa! 💖</p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
      <div className="fixed inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-black/50 pointer-events-none" />
    </div>;
};
export default CelebrationSite;