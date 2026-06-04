# Parikh Agency 🛍️

A premium, modern, and highly interactive e-commerce and customization web platform for stationery, apparel, and custom-branded merchandise. Designed with an ultra-premium dark theme, glassmorphic elements, and fluid animations.

---

## ✨ Features

- **Public Guest Browsing**: Anyone can browse the store catalog, explore specific product collections, and design custom merchandise without signing in.
- **Custom Design Studio**: 
  - Dynamic overlay system to preview designs on 3D product images.
  - Interactive font selections, engraving text options, and real-time color styling.
  - Drag-and-drop system to position custom text or uploaded graphics.
- **Seamless Cart and Checkout Flow**:
  - Translucent side-drawer cart listing items with custom options.
  - Security check that seamlessly redirects guest customers to register/login before executing payments.
  - Integrated mock payment verification portal (UPI scanning support).
- **Comprehensive Admin Suite**:
  - Live dashboards, database listing management for items, order approval states, and statistics counters.
  - Dynamic invoice generator.
- **Local Persistence**: State, session data, user tables, and cart contents are securely managed inside local storage, rendering the app fully operational offline.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, JavaScript (ES6+), HTML5, CSS3
- **CSS System**: Tailwind CSS v4 (incorporating `@theme` variables and utility directives)
- **Routing**: React Router v7
- **Icon Set**: Lucide React
- **Animations**: Framer Motion
- **Tooling**: Vite (Hot Module Replacement enabled)

---

## 🚀 Getting Started

### 1. Installation
Clone the repository, open the terminal in the project directory, and install dependencies:
```bash
npm install
```

### 2. Running locally
Start the local Vite development server:
```bash
npm run dev
```
Open **`http://localhost:5174/`** in your browser. (Port changes automatically if `5173` is occupied).

### 3. Build for production
To build files for production (stored in `/dist`):
```bash
npm run build
```

---

## 📦 Deployment to GitHub Pages

The repository comes pre-loaded with an automated CI/CD pipeline inside `.github/workflows/deploy.yml` which deploys the static build files directly to GitHub Pages on every push to the `main` branch.

### To host this project under your GitHub Pages subpath:
1. Ensure the `base` configuration inside your `vite.config.js` matches your repository name (currently configured for `/parikhagency/`):
   ```javascript
   base: command === 'serve' ? '/' : '/YOUR_REPOSITORY_NAME/'
   ```
2. Enable GitHub Pages in your repository settings:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**
3. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   git branch -M main
   git push -u origin main
   ```
   *The GitHub Action will automatically run, build, and deploy the application!*
