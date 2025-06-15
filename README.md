
# StoryLens 3D

A production-ready, scroll-driven narrative site that merges text, animation, and live interactive 3D using React + TypeScript, Tailwind, React-Three-Fiber, and Framer Motion.

## Live demo

**TODO:** Deploy to Vercel/Netlify and add your link here.

---

## 🚀 Getting Started

```bash
# Clone repository & install dependencies
npm install

# Start Vite development server
npm run dev
```

The app will be available at http://localhost:8080

---

## 📁 Folder Structure (Relevant Parts)

```
src/
  components/
    Navbar.tsx
    Chapter.tsx
    ModelViewer.tsx
    ProgressBar.tsx
    Footer.tsx
    ParticleBackground.tsx
  pages/
    Index.tsx
    about.tsx
    library.tsx
  assets/
    models/
      place-your-glb-or-gltf-here.glb
  styles/
    globals.css
  App.tsx
  main.tsx
...
```

---

## 🖼️ Adding/Using 3D Models

- Put your `.glb` or `.gltf` model files in `src/assets/models/`
- Reference them in chapters with a relative path, e.g.:

```ts
modelUrl: "/src/assets/models/your-model.glb"
```

- For an online model browser, add more to `/pages/library.tsx`
- Replace `sample-cube.glb` with your own—try free assets from [poly.pizza](https://poly.pizza/) or [sketchfab.com](https://sketchfab.com/)

---

## ✨ Features

- Scroll-based chapter reveals (typewriter, fade, slide-up)
- Background gradient or animated particle/star canvas
- Fully interactive 3D viewer (rotate, zoom)
- Scroll progress bar with jump-to-chapter dots
- Responsive split or stacked layouts
- All styles via Tailwind (see `src/styles/globals.css`)
- Add more chapters, new models, or pages as desired!

---

## 🛠️ Tech Stack

- React, TypeScript, Tailwind, shadcn/ui
- 3D: @react-three/fiber, @react-three/drei
- Animations: framer-motion
- Routing: react-router-dom

---

## 📦 Production & Deployment

- `npm run build` for optimized static build, ready for Vercel or Netlify.
- No API keys or backend required.
- Customize chapters/text by editing `src/pages/Index.tsx` and model assets.

