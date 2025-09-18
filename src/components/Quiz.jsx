import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronRight, Heart } from 'lucide-react';
import Calendar from './Calendar';
import { useToast } from "./ui/use-toast";

const Quiz = ({ onComplete, onReset }) => {
  const [currentStep, setCurrentStep] = useState('letter');
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    relationshipDate: '',
    firstEncounter: '',
    petName: ''
  });
  const [errorCount, setErrorCount] = useState(0);
  const [showCkisabeAnimation, setShowCkisabeAnimation] = useState(false);
  const { toast } = useToast();

  const handleWrongAnswer = () => {
    if (errorCount + 1 > 1) {
      toast({
        title: "😑",
        description: "Muitos erros... Voltando para o início.",
        variant: "destructive",
      });
      setTimeout(() => {
        onReset();
      }, 2000);
    } else {
      setErrorCount(prev => prev + 1);
      toast({
        title: "Ops! Tente novamente 😘",
        variant: "destructive",
      });
    }
  };

  const handleLetterClick = () => {
    setCurrentStep('waiting');
    setTimeout(() => {
      setCurrentStep('identity');
    }, 2000);
  };

  const handleNameSubmit = () => {
    if (formData.name.toLowerCase().trim() === 'maria beatriz da conceição paz') {
      setCurrentStep('birthdate');
    } else {
      handleWrongAnswer();
    }
  };

  const handleBirthDateSubmit = () => {
    if (formData.birthDate === '2010-01-20') {
      setCurrentStep('relationship');
    } else {
      handleWrongAnswer();
    }
  };

  const handleRelationshipDateSubmit = (date) => {
    if (date === '2025-06-23') {
      setFormData({ ...formData, relationshipDate: date });
      setCurrentStep('thinking');
      setTimeout(() => {
        setCurrentStep('firstEncounter');
      }, 3000);
    } else {
      handleWrongAnswer();
    }
  };

  const handleEncounterSubmit = () => {
    const answer = formData.firstEncounter.toLowerCase().trim();
    if (answer === 'açaí parabrasil' || answer === 'ckisabe') {
      if (answer === 'ckisabe') {
        setShowCkisabeAnimation(true);
        setTimeout(() => {
          setShowCkisabeAnimation(false);
          setCurrentStep('petName');
        }, 2000);
      } else {
        setCurrentStep('petName');
      }
    } else {
      handleWrongAnswer();
    }
  };

  const handlePetNameSubmit = () => {
    if (formData.petName.toLowerCase().trim() === 'elijah') {
      setCurrentStep('success');
      setTimeout(() => {
        onComplete();
      }, 4000);
    } else {
      handleWrongAnswer();
    }
  };

  const renderInputStep = (step, title, label, valueKey, nextHandler) => (
    <motion.div
      key={step}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full max-w-md"
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-pink-300 mb-6 text-center">{title}</h2>
        <div className="space-y-4">
          <label className="block text-white text-sm font-medium">{label}</label>
          <input
            type="text"
            value={formData[valueKey]}
            onChange={(e) => setFormData({ ...formData, [valueKey]: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none"
            placeholder=""
          />
          <Button onClick={nextHandler} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStep === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
            className="text-center"
          >
            <p className="text-xl text-pink-300 mb-8">Clique para abrir</p>
            <motion.div
              className="letter-animation cursor-pointer"
              onClick={handleLetterClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-gradient-to-br from-pink-600 to-purple-700 p-8 rounded-lg shadow-2xl border border-pink-400">
                <Heart className="w-16 h-16 text-white mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white">💌</h2>
                <p className="text-pink-200 mt-2">Uma surpresa especial te aguarda...</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {currentStep === 'waiting' && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-xl text-pink-300">Confirmação de identidade...</p>
          </motion.div>
        )}

        {currentStep === 'identity' && renderInputStep('identity', 'Confirmação de Identidade', 'Digite seu nome completo:', 'name', handleNameSubmit)}

        {currentStep === 'birthdate' && (
          <motion.div
            key="birthdate"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full max-w-md"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-pink-300 mb-6 text-center">Data de Nascimento</h2>
              <div className="space-y-4">
                <label className="block text-white text-sm font-medium">Coloque a data de nascimento:</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                />
                <Button onClick={handleBirthDateSubmit} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'relationship' && (
          <motion.div
            key="relationship"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full max-w-lg"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-pink-300 mb-6 text-center">Qual a data do começo do nosso namoro?</h2>
              <Calendar onDateSelect={handleRelationshipDateSubmit} initialDisplayDate={new Date()} />
            </div>
          </motion.div>
        )}

        {currentStep === 'thinking' && (
          <motion.div key="thinking" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-center">
            <motion.div className="thinking-animation text-6xl mb-4">🤔</motion.div>
            <motion.p className="text-2xl text-pink-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Ainda não tenho certeza...</motion.p>
          </motion.div>
        )}

        {currentStep === 'firstEncounter' && renderInputStep('firstEncounter', 'Quase lá...', 'Qual foi o lugar do nosso primeiro encontro?', 'firstEncounter', handleEncounterSubmit)}
        
        {currentStep === 'petName' && renderInputStep('petName', 'Última pergunta!', 'Qual é o nome do nosso foginho?', 'petName', handlePetNameSubmit)}

        {currentStep === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
            <motion.h2 className="text-5xl font-bold text-yellow-400 mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>Parabéns!</motion.h2>
            <motion.p className="text-2xl text-pink-300" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}>Isso tudo é para você meu amor 😘</motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {showCkisabeAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl emoji-float"
              style={{ left: `${Math.random() * 80 + 10}%` }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -150, opacity: 0 }}
              transition={{ duration: 2, delay: i * 0.2, ease: "easeOut" }}
            >
              😈
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;