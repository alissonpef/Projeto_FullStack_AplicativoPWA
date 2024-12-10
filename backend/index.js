const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const MainRoutes = require("./routes/MainRoutes");
const UsersRoutes = require("./routes/UsersRoutes");
const AccountRoutes = require("./routes/AccountRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/", MainRoutes);
app.use("/users", UsersRoutes);
app.use("/account", AccountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
