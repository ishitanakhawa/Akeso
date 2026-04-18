require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Basic health check route
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "LifeOS Backend is running" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
