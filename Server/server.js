const express = require("express");

const connectDB = require("../config/db");
const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, world");
});

// Define Routes
app.use("/api/users", require("./API/routes/users"));
app.use("/api/auth", require("./API/routes/auth"));
app.use("/api/games", require("./API/routes/games"));
app.use("/api/teams", require("./API/routes/teams"));
app.use("/api/operatives", require("./API/routes/operatives"));
app.use("/api/actions", require("./API/routes/actions"));
app.use("/api/tac_ops_cards", require("./API/routes/tac_ops_cards"));
app.use("/api/player_stats", require("./API/routes/player_stats"));
app.use("/api/weapons", require("./API/routes/weapons"));
app.use("/api/rules", require("./API/routes/rules"));
app.use("/api/ploys", require("./API/routes/ploys"));
app.use("/api/missions", require("./API/routes/missions"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
