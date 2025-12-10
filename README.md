# SỘT SOẠT CHẤM COM

3D Scans Gallery built with React + Three.js

## 🚀 Live Demo

Deploy on Vercel: [sotsoatchamcom.vercel.app](https://sotsoatchamcom.vercel.app)

## 🛠️ Tech Stack

- **React** - UI Framework
- **Three.js** - 3D Rendering
- **React Three Fiber** - React renderer for Three.js
- **Vite** - Build tool
- **pnpm** - Package manager

## 📦 Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## 📁 Add New Models

1. Add `.glb` file to `public/models/`
2. Edit `src/data/models.json`:

```json
{
  "id": "3",
  "name": "Model Name",
  "description": "Description",
  "date": "2024-12-10",
  "file": "/models/filename.glb"
}
```

## 🌐 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub: `Shodydosh/sotsoatchamcom`
3. Vercel auto-detects Vite → Click Deploy!

**Settings (auto-detected):**
- Framework: Vite
- Build Command: `pnpm build`
- Output Directory: `dist`
