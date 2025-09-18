import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Quiz from './components/Quiz';
import CelebrationSite from './components/CelebrationSite';
import { Toaster } from './components/ui/toaster';

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizKey, setQuizKey] = useState(Date.now());

  const handleQuizComplete = () => {
    setQuizCompleted(true);
  };

  const handleResetQuiz = () => {
    setQuizCompleted(false);
    setQuizKey(Date.now());
  };

  return (
    <>
      <Helmet>
        <title>3 Meses de Amor 💕</title>
        <meta name="description" content="Uma celebração especial dos nossos 3 meses de namoro" />
      </Helmet>
      
      <div className="min-h-screen bg-black">
        <AnimatePresence mode="wait">
          {!quizCompleted ? (
            <Quiz key={quizKey} onComplete={handleQuizComplete} onReset={handleResetQuiz} />
          ) : (
            <CelebrationSite key="celebration" />
          )}
        </AnimatePresence>
        <Toaster />
      </div>
    </>
  );
}

export default App;