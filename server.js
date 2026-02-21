import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const systemPrompt = `
Sos una guía clara en español.
Respondés:
- corto (máx 3 líneas)
- simple
- directo
- con emojis suaves 🙂👍
`;

async function responderIA(mensaje){

  const r = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model:"gpt-5.2",
      messages:[
        { role:"system", content: systemPrompt },
        { role:"user", content: mensaje }
      ]
    })
  });

  const data = await r.json();
  return data.choices[0].message.content;
}

app.post("/chat", async (req,res)=>{

  try{

    const mensaje = req.body.mensaje || "";

    const respuesta = await responderIA(mensaje);

    res.json({ respuesta });

  }catch(e){

    res.json({ respuesta:"Ups 😅 hubo un problema. Probá otra vez." });

  }
});

app.listen(3000,()=>{
  console.log("IA REAL activa 🚀");
});

