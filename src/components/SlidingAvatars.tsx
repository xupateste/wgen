"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Star } from 'lucide-react';

// Tipado para cada avatar con un ID único para React
interface AvatarInstance {
  id: string;
  initials: string;
}

export function SlidingAvatars({ onCtaClick }: { onCtaClick: () => void }) {
  const allInitials = [
    'SM', 'KA', 'SO', 'RI', 'ME', 'AB', 'SU', 'RO', 'JE', 'MI', 
    'BA', 'ZA', 'LU', 'VI', 'CO', 'TO', 'MA', 'QU', 'MO', 'ZE',
    'AN', 'CL', 'DA', 'EL', 'FR', 'GA', 'HA', 'IO', 'LA', 'NO', 
    'PA', 'RU', 'SA', 'TI', 'UM', 'VA', 'XO', 'YA', 'ZO', 'BE',
    'DI', 'FO', 'HU', 'LI', 'NE', 'OR', 'PI', 'RE', 'SI', 'TE'
  ];

  const bgColors = [
    // Tus tonos fríos y corporativos (Seguridad y Tecnología)
    'bg-blue-600', 'bg-slate-800', 'bg-emerald-600', 'bg-indigo-600', 
    'bg-sky-600', 'bg-teal-600', 'bg-cyan-700', 'bg-blue-800',
    'bg-slate-900', 'bg-indigo-800', 'bg-emerald-700', 'bg-blue-700',
    
    // NUEVOS: Tonos cálidos y vibrantes (Diversidad y Energía)
    'bg-orange-600', 'bg-rose-600', 'bg-amber-600', 'bg-violet-600',
    'bg-red-700', 'bg-fuchsia-700', 'bg-pink-700', 'bg-yellow-600'
  ];

  // Estado inicial: 5 avatares con IDs únicos
  const [visible, setVisible] = useState<AvatarInstance[]>(
    allInitials.slice(0, 5).map(it => ({ id: Math.random().toString(), initials: it }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => {
        // Elegimos uno al azar de la lista original
        const randomInitial = allInitials[Math.floor(Math.random() * allInitials.length)];
        
        // Creamos la nueva instancia (la que entrará por la derecha)
        const nextAvatar = {
          id: Math.random().toString(),
          initials: randomInitial
        };

        // Quitamos el primero (izquierda) y agregamos el nuevo (derecha)
        return [...prev.slice(1), nextAvatar];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []); // [] asegura que el intervalo NO se reinicie nunca

  const getColor = (initials: string) => {
    // El hash ahora tiene más "espacio" para elegir colores distintos
    const hash = initials.charCodeAt(0) * 31 + (initials.charCodeAt(1) || 0);
    return bgColors[hash % bgColors.length];
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex -space-x-3">
        {visible.map((avatar, index) => {
          // Solo el último elemento de la lista hace el "pop" al entrar
          const isNewest = index === visible.length - 1;

          return (
            <div 
              key={avatar.id} // CRÍTICO: El ID único hace que React sepa quién es nuevo
              className={`
                w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-sm transition-all duration-500
                ${getColor(avatar.initials)} 
                ${isNewest ? 'animate-avatar-pop' : ''} 
              `}
              style={{ zIndex: index }}
            >
              {avatar.initials}
            </div>
          );
        })}
        
        <button
          onClick={onCtaClick}
          className="w-10 h-10 bg-slate-50 hover:bg-slate-200 text-slate-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm transition-transform hover:scale-110 z-50 relative group cursor-pointer"
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center sm:justify-start gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm font-medium text-slate-500">
            5.0
          </span>
        </div>

        <span className="text-sm font-medium text-slate-500 -mt-1">
          Únete a los <strong className="text-slate-900 font-extrabold">2k+</strong> ferreteros.
        </span>
      </div>
    </div>
  );
}