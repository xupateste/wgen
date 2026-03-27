"use server";

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function submitWaitlist(data: any) {
  // 1. Verificamos el Honeypot (Seguridad anti-bots)
  if (data.honeypot && data.honeypot.length > 0) {
    console.warn("Bot detectado.");
    return true; // Mentimos al bot para que se vaya contento
  }

  try {
    // 2. Inicializamos la autenticación de Google con la Service Account
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Arregla los saltos de línea del .env
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    // 3. Conectamos con el documento específico
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID!, serviceAccountAuth);
    
    // Cargamos la info del documento
    await doc.loadInfo(); 
    
    // 4. Seleccionamos la primera pestaña de la hoja
    const sheet = doc.sheetsByIndex[0]; 

    // 5. Agregamos la fila
    // Asegúrate de que tu Google Sheet tenga en la fila 1 exactamente estos encabezados:
    // Fecha | ID_Usuario | Nombre | Correo | WhatsApp | Prompt
    await sheet.addRow({
      Fecha: new Date().toISOString(),
      ID_Usuario: data.waitlist_id,
      Nombre: data.nombre,
      Correo: data.email,
      WhatsApp: data.whatsapp,
      Prompt: data.prompt || "N/A"
    });

    // Éxito total. Hemos guardado en Sheets sin usar Make.
    return true;

  } catch (error) {
    console.error("Error guardando en Google Sheets:", error);
    // Para el usuario la experiencia no debe romperse. Podrías guardar en una DB local de respaldo
    // o simplemente devolver false para que el modal intente de nuevo.
    return false; 
  }
}



// "use server";

// // Accedemos a la variable de entorno de forma segura
// const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

// export async function submitWaitlist(data: { nombre: string; email: string; whatsapp: string; prompt: string; honeypot: string; waitlist_id: string  }) {
  
//   // 1. PREVENCIÓN DE ABUSO: Si el honeypot tiene texto, es un bot.
//   // Retornamos 'true' para que el bot crea que tuvo éxito, pero NO enviamos nada a Make.
//   if (data.honeypot && data.honeypot.length > 0) {
//     console.log("Bot detectado y bloqueado silenciosamente.");
//     return true; 
//   }

//   // Validación de seguridad: si la URL no existe, lanzamos un error claro en consola
//   if (!WEBHOOK_URL) {
//     console.error("ERROR: MAKE_WEBHOOK_URL no está configurada en las variables de entorno.");
//     return false;
//   }

//   try {
//     const response = await fetch(WEBHOOK_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ 
//         nombre: data.nombre,
//         email: data.email, 
//         whatsapp: data.whatsapp,
//         waitlist_id: data.waitlist_id,
//         intencion_busqueda: data.prompt, 
//         origen: "Landing Genio",
//         fecha: new Date().toISOString() 
//       }),
//     });
//     return response.ok;
//   } catch (error) {
//     console.error("Error en el webhook:", error);
//     return false;
//   }
// }