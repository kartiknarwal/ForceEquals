import express from "express";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", accountRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
