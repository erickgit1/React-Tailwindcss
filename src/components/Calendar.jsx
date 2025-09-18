import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const Calendar = ({ onDateSelect, initialDisplayDate }) => {
  // Inicializa a data no primeiro dia do mês
  const today = new Date();
  const initialDate = initialDisplayDate 
    ? new Date(initialDisplayDate.getFullYear(), initialDisplayDate.getMonth(), 1) 
    : new Date(today.getFullYear(), today.getMonth(), 1);

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Retorna um array com os dias do mês
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Navega para o mês anterior
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const year = prev.getMonth() === 0 ? prev.getFullYear() - 1 : prev.getFullYear();
      const month = prev.getMonth() === 0 ? 11 : prev.getMonth() - 1;
      return new Date(year, month, 1);
    });
  };

  // Navega para o próximo mês
  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const year = prev.getMonth() === 11 ? prev.getFullYear() + 1 : prev.getFullYear();
      const month = prev.getMonth() === 11 ? 0 : prev.getMonth() + 1;
      return new Date(year, month, 1);
    });
  };

  // Seleciona um dia
  const handleDayClick = (day) => {
    if (day) {
      const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(selected);

      const formattedDate = selected.toISOString().split('T')[0];
      if (onDateSelect) onDateSelect(formattedDate);
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
      {/* Cabeçalho com navegação */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevMonth}
          className="text-pink-300 hover:text-pink-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <h3 className="text-lg font-semibold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
          className="text-pink-300 hover:text-pink-200"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-400 p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Dias do mês */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <motion.div
            key={index}
            className={`calendar-day cursor-pointer rounded-md text-center p-2 ${
              day ? 'text-white hover:bg-pink-600' : 'text-transparent'
            } ${
              selectedDate &&
              day === selectedDate.getDate() &&
              currentDate.getMonth() === selectedDate.getMonth() &&
              currentDate.getFullYear() === selectedDate.getFullYear()
                ? 'bg-pink-500 font-bold'
                : ''
            }`}
            onClick={() => handleDayClick(day)}
            whileHover={day ? { scale: 1.05 } : {}}
            whileTap={day ? { scale: 0.95 } : {}}
          >
            {day}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
