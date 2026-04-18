from typing import List, Dict

class AIService:
    @staticmethod
    def analyze_patterns(data: Dict) -> Dict:
        """
        Mock AI logic to calculate mental balance score and risk level
        based on 9 input variables.
        """
        # Simple weighted logic for demonstration
        stress = data.get("stress_level", 5)
        sleep = data.get("sleep_hours", 7)
        anxiety = data.get("anxiety_level", 5)
        
        # Invert stress and anxiety for score calculation (higher is better for balance)
        score = int(((10 - stress) + (10 - anxiety) + (sleep * 1.25)) / 30 * 100)
        score = min(max(score, 0), 100)

        risk_level = "low"
        if score < 40:
            risk_level = "high"
        elif score < 70:
            risk_level = "moderate"

        recommendations = [
            "Maintain a consistent sleep schedule",
            "Engage in at least 30 minutes of physical activity",
            "Practice mindful breathing exercises during high-stress peaks"
        ]
        
        if risk_level == "high":
            recommendations.append("Consider scheduling a clinical consultation with professional support.")
        
        return {
            "mental_score": score,
            "risk_level": risk_level,
            "recommendations": recommendations
        }
