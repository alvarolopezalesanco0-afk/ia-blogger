import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat",(req,res)=>{
  res.json({ respuesta:"IA activa 🙂👍" });
});

app.listen(3000,()=>{
  console.log("Servidor listo 🚀");
});
