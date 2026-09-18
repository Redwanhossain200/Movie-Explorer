# 🎬 Movie Explorer

A responsive movie and TV show exploration web application built with **React**, **Vite**, and **Tailwind CSS**. Users can browse a comprehensive catalog of shows, search for titles with real-time debounced updates, and view rich details in an interactive modal.

---

## ✨ Features

- **🏠 Home Page (Hero Banner)**
  - Cinematic hero banner with movie background & ambient gradients.
  - Quick highlights / statistics counter.
  - Call-to-Action buttons to immediately jump to the movies catalog.

- **📱 Fully Responsive Navigation (Navbar)**
  - Desktop: Clean inline navigation links.
  - Mobile: Interactive slide-out **Hamburger Menu** with smooth touch-friendly controls.

- **🔍 Live Movie Search**
  - Prominent search bar with instant 400ms debouncing (no lag, optimal requests).
  - Clear button and instant search submission support.
  - Dynamic result counter and dedicated empty states.

- **🎬 Responsive Movie Grid**
  - Adapts seamlessly from single-column mobile view to 5-column desktop grid.
  - Movie cards showcasing posters, titles, star ratings (⭐), release years (📅), and genre badges.
  - Fallback placeholders for missing images.

- **🎞️ Interactive Movie Details Modal**
  - **Desktop / Tablet:** Side-by-side layout with movie poster on the **left** and all details on the **right**.
  - **Mobile:** Compact header with poster thumbnail on the left, followed by full-width details, genres, network, language, and overview.
  - Closes via `✕` button, dedicated Close button, clicking outside the backdrop, or pressing `Esc`.

- **⚡ State Management & Architecture**
  - Global state managed via React Context (`MovieContext` & `MovieProvider`).
  - Custom hooks: `useShows`, `useDebounce`, and `useMovieContext`.

---

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Routing:** React Router v7
- **Linter:** ESLint 9 (Flat Config)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

The app will be running at `http://localhost:5173/`.

### 4. Build for production

```bash
npm run build
```

### 5. Run linter

```bash
npm run lint
```

---

## 📁 Project Structure

```
Movie-Explorer/
├── public/
│   └── hero-bg.jpg
├── src/
│   ├── assets/
│   │   └── hero-bg.jpg
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieModal.jsx
│   │   ├── Navbar.jsx
│   │   └── SearchBar.jsx
│   ├── context/
│   │   ├── MovieContext.js
│   │   └── MovieProvider.jsx
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   ├── useMovieContext.js
│   │   └── useShows.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── MoviesPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── package.json
└── vite.config.js
```

---

