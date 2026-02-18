import { registerSchema } from '@react-tech-stack/shared';
import { MemoryStorage } from './data/MemoryStorage';
import { calcCheck, createUser, type User } from './data/User';
import express from 'express';
import cors from 'cors';

const users = new MemoryStorage<User>();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const result = registerSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json(result.error);
  }

  const newUser: User = createUser(
    result.data.username,
    result.data.email,
    result.data.password
  );
  users.add(newUser);
  const { check, ...user } = newUser;
  res.json({ message: "User registriert", data: user });
});

app.post('/login', (req, res) => {
  const result = registerSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json(result.error);
  }

  const user = users.getBy("username", result.data.username) || users.getBy("email", result.data.email);
  if (!user || user.check !== calcCheck(user.id, result.data.password)) {
    return res.status(404).json({ message: "Invalid user or password" });
  }
  const updatedUser = users.update(user.id, { token: calcCheck(user.id, `${Date.now() + Math.random()}`), lastAction: Date.now() });
  
  res.status(200).json({ message: "User logged in", data: updatedUser });
});

app.put('/logout', (req, res) => {
  const token = req.headers.authorization;
  console.log("Token:", token);
  if(!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = users.getBy("token", token);
  if (!user) {
    return res.status(400).json({ message: "Invalid request" });
  }
  users.update(user.id, { token: null });
  res.status(200).json({ message: "User logged out" });
});

app.get('/users', (req, res) => {
  const token = req.headers.authorization;
  console.log("Token:", token);
  if (!token || !users.getBy("token", token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const allUsers = users.getAll().map(({ check, ...user }) => user);
  res.status(200).json({ message: "All users", data: allUsers });
});

app.listen(3000, () => console.log("Server running on Port 3000"));