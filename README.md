# RoleAI - Career Intelligence & Job Role Predictor

A beautiful, high-performance, single-page career intelligence web application. It predicts job roles based on user profiles (education, skills, certifications, and soft skills) and includes a comprehensive interactive Dataset Explorer.

Migrated to a pure, ultra-lightweight tech stack using **only 2 core technologies**:
1. **HTML5** (Semantic structure)
2. **CSS3 + JavaScript** (Vanilla styles, canvas physics, and application logic)

## 🌟 Features

- **AI-Powered Predictor Form**: Interactive profile builder with real-time autocomplete tags for skills, certifications, and soft skills.
- **Dynamic Predictions**: Real-time simulated prediction algorithms returning ideal job roles, confidence metrics, related roles, and actionable career advancement tips.
- **Glassmorphism Design**: High-end modern dark-themed dashboard with deep indigo, violet, and pink neon color accents and glassmorphic card layers.
- **Custom Canvas Particle Physics**: High-performance background animation engine running on HTML5 `<canvas>` using pure math and physics (zero external libraries).
- **Interactive Dataset Explorer**:
  - Asynchronously parses and loads the realistic job roles CSV dataset (`job_role_realistic_dataset.csv`).
  - Real-time instant search filtering across all columns (role, education, skills, certifications, soft skills).
  - Responsive pagination with page controls and records status indicator.

## 🚀 Getting Started

Because this application is built entirely using vanilla web technologies, there are **no build steps, node_modules, or package managers required**.

### How to Run Locally

Simply double-click **`index.html`** to open the app directly in any modern web browser!

Alternatively, you can serve it using a lightweight static server of your choice:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then open `http://localhost:8000` (or the port specified) in your browser.
