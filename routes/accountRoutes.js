import express from "express";
import jwt from "jsonwebtoken";
import { users, accounts } from "../data/accounts.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

router.get("/accounts", authenticate, (req, res) => {
  res.json(accounts);
});

router.post("/accounts/:id/status", authenticate, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const account = accounts.find(a => a.id === parseInt(id));

  if (!account) return res.status(404).json({ message: "Account not found" });

  account.status = status;
  res.json({ message: "Status updated", account });
});

export default router;
