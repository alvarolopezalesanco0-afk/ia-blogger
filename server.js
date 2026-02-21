import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

// 🧠 Personalidad Sigma
const systemPrompt = `
Sos Sigma, una guía clara en español.
Respondés:
- corto (máx 3 líneas)
- simple
- directo
- con emojis suaves 🙂👍
`;

// ======================
// 🤖 llamada a la IA real
async function responderIA(mensaje){

  const r = await fetch("https://api.openai.com/v1/responses",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model:"gpt-5.2",
      input: systemPrompt + "\nUsuario: " + mensaje
    })
  });

  const data = await r.json();

  // 👇 lectura segura del texto generado
  const texto =
    data.output_text ||
    data.output?.[0]?.content?.[0]?.text ||
    "🙂";

  return texto;
}

// ======================
app.post("/chat", async (req,res)=>{

  try{

    const mensaje = req.body.mensaje || "";

    const respuesta = await responderIA(mensaje);

    res.json({ respuesta });

  }catch(e){

    console.log("ERROR IA:", e);
    res.json({ respuesta:"Ups 😅 hubo un problema. Probá otra vez." });

  }

});

// ======================
app.listen(3000,()=>{
  console.log("🚀 Sigma IA REAL activa");
});
