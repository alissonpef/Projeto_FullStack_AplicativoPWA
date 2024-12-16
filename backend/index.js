const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const MainRoutes = require("./routes/MainRoutes");
const UsersRoutes = require("./routes/UsersRoutes");
const AccountRoutes = require("./routes/AccountRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*", // Permite requisições de qualquer origem
  methods: ["GET", "POST", "PUT", "DELETE"], // Permite esses métodos HTTP
  allowedHeaders: ["Content-Type", "Authorization"] // Permite esses cabeçalhos
}));
app.use(express.json());

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, "www")));

// Rotas da API com prefixo /api
app.use("/api", MainRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/account", AccountRoutes);

// Qualquer rota não reconhecida deve carregar o index.html do React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "www", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
