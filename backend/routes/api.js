const express = require("express");
const router = express.Router();
const energyController = require("../controllers/energyController");

// Authentication (Mock)
router.post("/auth/login", (req, res) => {
    res.json({ token: "mock-token-123", user: { name: "Test User", email: req.body.email } });
});

router.post("/auth/signup", (req, res) => {
    res.json({ token: "mock-token-123", user: { name: req.body.name, email: req.body.email } });
});

// Energy Logging and Dashboard
router.post("/log", energyController.logEnergy);
router.get("/dashboard", energyController.getDashboard);

// AI Coach Chat (Mock)
router.post("/chat", energyController.chatWithCoach);

// Insights
router.get("/insights", energyController.getInsights);

module.exports = router;
