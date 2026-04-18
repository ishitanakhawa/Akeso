let dailyLogs = [];

// AI Mental Output Engine (Mocked)
const generateMindSyncAnalysis = (inputs) => {
    let score = 50; // base points
    let riskFlags = [];
    let state = "Stable";

    // 1. Sleep impact (0-14 hours)
    if (inputs.sleep >= 7 && inputs.sleep <= 9) score += 20;
    else if (inputs.sleep < 5) { score -= 15; riskFlags.push("Sleep Deprivation Focus Drop"); }
    
    // 2. Stress impact (1-10)
    score -= (inputs.stress * 2);
    if (inputs.stress > 7) { riskFlags.push("Moderate Stress"); }
    
    // 3. Anxiety impact (1-10)
    score -= (inputs.anxiety * 2);
    if (inputs.anxiety > 8) { riskFlags.push("Emotional Volatility"); }
    
    // 4. Burnout Compound Check
    if (inputs.stress > 7 && inputs.sleep < 6 && inputs.mood < 4) {
        riskFlags.push("Burnout Warning");
        state = "Critical";
    }

    // Normalized Score
    score = Math.max(0, Math.min(100, score));

    // Dynamic AI textual response based on detected flags
    let insightText = "Your metrics remain relatively balanced. Continue observing your daily rhythms.";
    if (riskFlags.includes("Burnout Warning")) {
        insightText = "Critical correlation detected: High stress combined with suboptimal sleep is creating a severe burnout protocol. It is highly recommended to engage professional resources or take immediate down-time.";
    } else if (riskFlags.includes("Moderate Stress") && inputs.activityMinutes > 20) {
        insightText = "We noticed high stress levels, but your physical activity is actively acting as a counter-balance. Maintaining this exercise habit is crucial right now.";
    }

    return { 
        mentalBalanceScore: score, 
        state, 
        riskFlags: riskFlags.length > 0 ? riskFlags : ["Low Risk"],
        aiObservation: insightText
    };
};

exports.logEnergy = (req, res) => {
    const inputs = req.body;
    // Expected inputs: sleep, mood, stress, anxiety, energy, focus, activityMinutes
    
    const analysis = generateMindSyncAnalysis(inputs);
    
    const newLog = {
        date: new Date().toISOString(),
        inputs,
        analysis
    };
    dailyLogs.push(newLog);

    res.json({
        message: "Log successfully synchronized with AI.",
        ...analysis
    });
};

exports.getDashboard = (req, res) => {
    const latestLog = dailyLogs.length > 0 ? dailyLogs[dailyLogs.length - 1] : null;
    res.json({ latestLog, streak: 12 }); // hardcoded streak for UI testing
};

exports.chatWithCoach = (req, res) => {
    const { message } = req.body;
    const lower = message.toLowerCase();
    
    let response = "I'm monitoring your cognitive baseline. How else can I assist you?";
    
    if (lower.includes("stressed") || lower.includes("anxious")) {
        response = "Your recent data shows your anxiety spiking when sleep falls under 6 hours. Let's try to focus on establishing a strong wind-down routine tonight. Want to try a 4-7-8 breathing exercise?";
    } else if (lower.includes("burnout") || lower.includes("exhausted")) {
        response = "Burnout is serious. Your data suggests cognitive fatigue peaks mid-afternoon. Try shifting your heaviest cognitive tasks to early morning and absolutely enforce a 30-minute disconnect at 2 PM.";
    }

    res.json({ response });
};

exports.getInsights = (req, res) => {
    res.json({ status: "Detailed insights ready via dynamic correlation engine." });
};
