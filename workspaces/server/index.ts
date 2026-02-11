import { registerSchema } from '@react-tech-stack/shared';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
  const result = registerSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  
  res.json({ message: "User registriert", data: result.data });
});

app.listen(3000, () => console.log("Server running on Port 3000"));