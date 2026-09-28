# MUI Button Designer

A modern, interactive button designer for Material-UI (MUI) with live preview and code generation.

## 🚀 Live Demo

**[https://mui-button-designer.vercel.app/](https://mui-button-designer.vercel.app/)**

## Features

- **Live Preview** - See your button changes in real-time
- **Comprehensive Controls** - Customize every aspect of your button:
  - Variant (Text, Outlined, Contained)
  - Colors (Theme colors or custom hex)
  - Size (Small, Medium, Large)
  - Icons (Start/End positioning)
  - Loading States with customizable positioning and text visibility
  - Border radius and elevation
  - Typography (Font family, font weight, uppercase text transform)
  - Accessibility (aria-label)
  - And more!

- **Font Selection** - Choose from 9 Google Fonts:
  - Figtree
  - Inter
  - Lexend
  - Montserrat
  - Open Sans
  - Poppins
  - Raleway
  - Roboto
  - Work Sans

- **Dynamic Font Weights** - Font weight options update automatically based on selected font
- **Code Generation** - Export your button as React/TSX code
- **Contrast Checker** - WCAG compliance indicator for text contrast
- **Dark Mode Support** - Preview your button on light and dark backgrounds

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **Zustand** - State management
- **Vite** - Build tool
- **React Colorful** - Color picker

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
git clone https://github.com/adanley-slalom/mui-button-designer.git
cd mui-button-designer
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

```bash
npm run build
```

## Deployment

This project is deployed to Vercel: https://mui-button-designer.vercel.app/

Any push to the `main` branch automatically triggers a new deployment.

## Project Structure

```
src/
├── components/          # React components
│   ├── ControlPanel.tsx # Settings and controls
│   ├── LivePreview.tsx  # Button preview area
│   └── CodePanel.tsx    # Generated code display
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # Constants (fonts, icons, etc.)
└── App.tsx            # Main app component
```

## License

MIT
