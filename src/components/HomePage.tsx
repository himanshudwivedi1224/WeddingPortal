import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

// Helper to format countdown
const calculateTimeLeft = (): TimeLeft => {
  const weddingDate = new Date('2026-01-23T00:00:00');
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();

  let timeLeft: TimeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const HomePage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const countdownComponents = Object.keys(timeLeft).map((interval) => {
    const value = timeLeft[interval as keyof TimeLeft];
    if (value === undefined) {
      return null;
    }
    return (
      <div key={interval} className="countdown-item flex flex-col items-center mx-2">
        <span className="countdown-value text-5xl md:text-7xl font-bold text-rose-gold font-sans">
          {value}
        </span>
        <span className="countdown-label text-lg md:text-xl font-sans capitalize text-text-light">
          {interval}
        </span>
      </div>
    );
  });

  return (
    <motion.section
      id="home"
      className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-center text-text-light"
      style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080/DDA0DD/FFFFFF?text=Romantic+Wedding+Background)' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Lighter overlay */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-8xl font-script font-normal mb-4"
      >
        Himanshu <FaHeart className="inline-block text-red-500" /> Ishika
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-2xl md:text-4xl font-sans z-10 mb-8"
      >
        Are Getting Married!
      </motion.p>
      <div className="z-10 flex justify-center items-center">
        {countdownComponents.length ? countdownComponents : <span className="text-4xl md:text-6xl font-bold text-rose-gold font-sans">The Big Day is Here!</span>}
      </div>
    </motion.section>
  );
};

export default HomePage;
