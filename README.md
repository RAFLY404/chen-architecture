# ACEN Architecture Portfolio

A premium, interactive architectural portfolio designed with a **Noir aesthetic**. This project features a custom 3D moodboard experience built with React, Three.js, and Framer Motion.

## 🏗️ Features

- **Architectural Noir Aesthetic**: A deep, monochromatic design system focused on typography and space.
- **Interactive 3D Moodboard**: A physics-enabled, draggable moodboard where cards float in a 3D-responsive scene.
- **Custom Shaders**: A custom-built WebGL background shader that animates architectural building sketches.
- **Dynamic Routing**: Fluid transitions between the home moodboard and project detail pages.
- **Double-Click Interaction**: Refined navigation logic to prevent accidental clicks during card manipulation.

## 🚀 Installation & Setup

Follow these steps to get the project running locally:

### 1. Clone the repository
```bash
git clone https://github.com/RAFLY404/chen-architecture.git
cd chen-architecture
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📦 Production Build

To build the project for production:

```bash
npm run build
```
The output will be generated in the `dist/` directory, ready for deployment.

For production hosting, configure every non-asset route to serve `index.html`.
This is required because the app uses React Router with browser history, so
refreshing routes like `/project/:id` must load the SPA entry file first.
`public/_redirects` covers Netlify-style static hosting, and `vercel.json`
covers Vercel rewrites.

## 🛠️ Tech Stack

- **Frontend**: React 19
- **3D Engine**: React Three Fiber & Drei
- **Animation**: Framer Motion & Use-Gesture
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
