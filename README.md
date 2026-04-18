# MindSync AI (Akeso AI)

MindSync AI is a premium, mental health application designed as a holistic Copilot for wellness. It provides users with a safe space to track daily wellness signals, receive intelligent behavioral analysis, and securely collaborate with healthcare professionals.

## 🚀 Features
- **Daily Wellness Tracking:** Record daily moods, sleep patterns, and stress levels through structured, interactive questionnaires.
- **Intelligent Behavioral Analysis:** Built to identify mental health patterns, detect early signs of mental fatigue, and provide actionable wellness insights.
- **Psychiatrist Collaboration:** A structured reporting feature that allows users to easily share summarized wellness data and trends with their doctors or therapists.
- **Responsive & Premium Design:** A calming, healthcare-focused user interface built with React, TailwindCSS, and Recharts for meaningful data visualization.
- **Privacy-First Architecture:** Secure, robust user authentication and role-based access controls to ensure sensitive health data remains private.

## 🛠️ Technology Stack
- **Frontend:** React, Vite, Tailwind CSS, Recharts, Lucide React, Axios, React Router
- **Backend:** Python, FastAPI, SQLAlchemy, Uvicorn, Pydantic
- **Database:** SQLite (`akeso.db`)

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Clone the repository
```bash
git clone https://github.com/ishitanakhawa/Akeso.git
cd Akeso
```

### 2. Backend Setup
Navigate to the `backend` directory, set up your Python environment, and start the server.
```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install the necessary dependencies
pip install fastapi uvicorn sqlalchemy 'pydantic[email]' email-validator

# Start the FastAPI server
uvicorn app.main:app --reload
```
The backend will be running at `http://localhost:8000`. You can access the auto-generated API documentation at `http://localhost:8000/docs`.

### 3. Frontend Setup
Open a new terminal window, navigate to the `frontend` directory, install Node modules, and start the Vite development server.
```bash
cd frontend

# Install dependencies
npm install

# Start the frontend server
npm run dev
```
The frontend will be running at `http://localhost:5173`. Open this URL in your browser to interact with the application.

---
*Built with ❤️ for mental health and wellness.*
