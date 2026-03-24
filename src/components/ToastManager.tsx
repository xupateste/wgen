"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin } from 'lucide-react';

interface ToastData {
  id: number;
  name: string;
  location: string;
  time: string;
  isExiting: boolean;
}

export const ToastManager = ({ isHeroVisible }: { isHeroVisible: boolean }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Datos hiper-enfocados en el mercado real (Ferreterías en Perú)
  const baseData = [
    { name: 'Carlos M.', location: 'Lima', time: 'hace 2 horas' },
    { name: 'Ferretería J&C', location: 'Arequipa', time: 'hace 5 horas' },
    { name: 'Roberto', location: 'Trujillo', time: 'hace 1 día' },
    { name: 'Inversiones R.', location: 'Huancayo', time: 'hace 3 horas' },
    { name: 'Distribuidora Gomez', location: 'Piura', time: 'hace 2 días' },
    { name: 'Luis A.', location: 'Cusco', time: 'hace 15 min' },
    { name: 'Ferretería El Sol', location: 'Chiclayo', time: 'hace 4 horas' },
    { name: 'Miguel', location: 'Tarapoto', time: 'hace 1 día' },
  ];

  // const shuffle = useCallback((arr: any[]) => [...arr].sort(() => Math.random() - 0.5), []);
  // const [queue, setQueue] = useState(() => shuffle(baseData));
  const [queue, setQueue] = useState(baseData); // Carga la lista inicial en orden

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 12000 + Math.random() * 13000; 

      timeoutRef.current = setTimeout(() => {
        setQueue(currQueue => {
          let nextQueue = [...currQueue];
          
          // Si se acaba la lista, simplemente la volvemos a llenar con la base
          // (Opcional: aquí sí podrías usar un shuffle simple porque ya estamos en el cliente)
          if (nextQueue.length === 0) nextQueue = [...baseData].sort(() => Math.random() - 0.5);
          
          const nextItem = nextQueue.shift()!;
          const newToast = { ...nextItem, id: Date.now(), isExiting: false };

          setToasts(curr => [...curr, newToast]);

          // Animar salida después de 5 segundos
          setTimeout(() => {
            setToasts(curr => curr.map(t => t.id === newToast.id ? { ...t, isExiting: true } : t));
          }, 5000);

          // Remover del DOM
          setTimeout(() => {
            setToasts(curr => curr.filter(t => t.id !== newToast.id));
          }, 5500);

          return nextQueue;
        });
        scheduleNext();
      }, delay);
    };

    // Solo mostrar si NO estamos viendo el Hero (para no distraer del CTA principal)
    if (!isHeroVisible) {
      scheduleNext();
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHeroVisible, shuffle, baseData]);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl p-4 flex items-center gap-4 w-72 transition-all duration-500
            ${toast.isExiting ? 'opacity-0 translate-y-4 scale-95' : 'animate-in slide-in-from-bottom-5 fade-in'}
          `}
        >
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <MapPin size={18} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-[13px]">{toast.name}</span>
            <span className="text-[12px] text-slate-500 flex items-center gap-1">
              Se unió {toast.time} <span className="w-1 h-1 rounded-full bg-slate-300 mx-0.5" /> {toast.location}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};