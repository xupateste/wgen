"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';

export function SlidingAvatars({ onCtaClick }: { onCtaClick: () => void }) {
  const allAvatars = [
    'SM', 'KA', 'SO', 'RI', 'ME', 'AB', 'SU', 'RO', 'JE', 'MI', 
    'BA', 'ZA', 'LU', 'VI', 'CO', 'TO', 'MA', 'QU', 'MO', 'ZE', 
    'MU', 'PE', 'KI', 'JI', 'HE', 'WA', 'RE', 'GU', 'NE', 'YO', 'EU'
  ];

  const bgColors = [
    'bg-blue-600', 'bg-slate-800', 'bg-emerald-600', 'bg-indigo-600', 
    'bg-sky-600', 'bg-teal-600', 'bg-cyan-700', 'bg-blue-800'
  ];

  const getColor = (initials: string) => {
    const hash = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    return bgColors[hash % bgColors.length];
  };

  const [queue, setQueue] = useState(allAvatars); 
  const [visible, setVisible] = useState(allAvatars.slice(0, 5)); 
  const [popping, setPopping] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(curr => {
        const nextQueue = [...queue];
        // Si se acaba la lista original, podemos barajarla para que siga rotando
        if (nextQueue.length === 0) {
           nextQueue.push(...[...allAvatars].sort(() => Math.random() - 0.5));
        }

        const nextAvatar = nextQueue.shift() || 'GE';
        setQueue(nextQueue);

        const newVisible = [...curr.slice(1), nextAvatar];
        setPopping(nextAvatar); // Registramos cuál es el avatar nuevo
        return newVisible;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [queue, allAvatars]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
      <div className="flex -space-x-3 hover:space-x-[-8px] transition-all duration-300">
        {visible.map((initials, index) => {
          // Identificamos si este es el avatar que acaba de entrar
          const isPopping = popping === initials;
          
          return (
            <div 
              key={`${initials}-${index}`} 
              className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-sm transition-all duration-500 origin-center
                ${getColor(initials)} 
                ${index === 0 ? 'opacity-0 w-0 border-0' : 'opacity-100'} 
                ${isPopping ? 'animate-avatar-pop' : ''} 
              `}
              style={{ zIndex: index }}
            >
              {index !== 0 && initials}
            </div>
          );
        })}
        
        {/* Botón CTA (+) */}
        <button
          onClick={onCtaClick}
          className="cursor-pointer w-10 h-10 bg-slate-50 hover:bg-slate-200 text-slate-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm transition-transform hover:scale-105 z-50 relative group"
          title="Unirme a la lista"
        >
          <Plus size={18} strokeWidth={3} />
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white text-[10px] py-1 px-2 rounded font-medium whitespace-nowrap">
            Unirme ahora
          </span>
        </button>
      </div>
      
      <span className="text-sm font-medium text-slate-500">
        Únete a los <strong className="text-slate-900 font-extrabold">2k+</strong> dueños.
      </span>
    </div>
  );
}