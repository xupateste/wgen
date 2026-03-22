// src/app/actions.ts
// https://hook.us2.make.com/gyxo6var7w3n2q6fcykhrm9p7wu3alrn
"use server";

// Accedemos a la variable de entorno de forma segura
const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

export async function submitWaitlist(data: { nombre: string; email: string; whatsapp: string; prompt: string; honeypot: string }) {
  
  // 1. PREVENCIÓN DE ABUSO: Si el honeypot tiene texto, es un bot.
  // Retornamos 'true' para que el bot crea que tuvo éxito, pero NO enviamos nada a Make.
  if (data.honeypot && data.honeypot.length > 0) {
    console.log("Bot detectado y bloqueado silenciosamente.");
    return true; 
  }

  // Validación de seguridad: si la URL no existe, lanzamos un error claro en consola
  if (!WEBHOOK_URL) {
    console.error("ERROR: MAKE_WEBHOOK_URL no está configurada en las variables de entorno.");
    return false;
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        nombre: data.nombre,
        email: data.email, 
        whatsapp: data.whatsapp,
        intencion_busqueda: data.prompt, 
        origen: "Landing Genio",
        fecha: new Date().toISOString() 
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error en el webhook:", error);
    return false;
  }
}