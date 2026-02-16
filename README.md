# 🛡️ VitaGuard — Health Risk Analysis

VitaGuard is a pro-level health monitoring application that uses **Google Gemini AI** and clinical data models to provide early risk detection for cardiovascular, respiratory, and metabolic conditions.

## 🚀 Getting Started for Collaborators

Follow these steps to set up the project on your local machine and start making changes.

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node)
- **Git**

### 2. Clone and Install
Open your terminal (Command Prompt, PowerShell, or Git Bash) and run:

```bash
# Clone the repository
git clone <repository-url>

# Enter the project folder
cd silver-space

# Install all dependencies
npm install
```

### 3. Setup Environment Variables
The app requires API keys for Firebase and Gemini AI. These are **not** stored in Git for security.

1.  Find the file `.env.example` in the root folder.
2.  **Duplicate** it and rename the copy to `.env`.
3.  Open `.env` and paste the API keys provided by the project owner.

### 4. Opening the Project
To see all the files and make changes:
1.  Open **VS Code** (or your preferred editor).
2.  Go to `File > Open Folder`.
3.  Select the `silver-space` folder.
4.  You can now browse the `src/` directory to edit components and logic.

### 5. Running the Development Server
To see your changes live in the browser:

```bash
npm run dev
```
Once it starts, open **http://localhost:5173** in your browser.

---

## 🛠️ Project Structure
- `src/components/`: Reusable UI elements (Navbar, Footer, Modals).
- `src/pages/`: Main page views (Dashboard, Assessment, Landing).
- `src/services/`: API communication (Firebase & Gemini AI logic).
- `src/context/`: Authentication and Global State.

## 🤝 How to Contribute
1.  **Branching**: Always create a new branch for your task: `git checkout -b feature/your-feature-name`.
2.  **Committing**: Keep your commits clean and descriptive.
3.  **Pushing**: Push your branch and create a Pull Request on GitHub for review.

---
*Developed with focus on visual excellence and medical precision.*
