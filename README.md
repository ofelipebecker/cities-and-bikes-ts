# Cidades & Bikes

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Mapbox GL](https://img.shields.io/badge/Mapbox%20GL-3.24-000000?logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive cycling map of Florianópolis (Brazil) and surrounding cities, providing information on regional cycling infrastructure and useful locations for cyclists.

---

## About

**Cidades & Bikes** is an interactive map that brings together essential information for cyclists in the Florianópolis region. The project allows users to view and toggle between different layers of points of interest — gas stations, parking, stores & workshops, and toilets — with detailed information such as address, opening hours, and contact details.

### Key Technical Features

- **Interactive Mapbox GL map** — Smooth navigation with zoom, pan, and native controls
- **Toggleable layers** — Individual toggle for each point of interest category via side menu
- **Informative popups** — Structured data with name, address, formatted opening hours, and contact info
- **Smart opening hours formatting** — `opening_hours` library with Portuguese translation fallbacks
- **Feature-based architecture** — Modular separation with hooks, utilities, and state context

---

## Built With

| Category         | Technologies                          |
| ---------------- | ------------------------------------- |
| **Framework**    | React 19 + Vite 8                     |
| **Language**     | TypeScript 5.9                        |
| **Map**          | Mapbox GL 3.24                        |
| **UI**           | React-Bootstrap 2, Bootstrap 5, Sass  |
| **Date/Time**    | opening_hours 3.12                    |
| **Code Quality** | ESLint + Prettier + TypeScript-ESLint |

---

## Architecture

```
src/
├── assets/
│ └── images/
│ ├── icons/ # Custom layer icons
│ │ ├── i-gas.svg
│ │ ├── i-parking.svg
│ │ ├── i-stores.svg
│ │ └── i-toilets.svg
│ └── logo-ctb-horizontal-dark-pt.svg
├── features/
│ ├── bikemap/ # Main map feature
│ │ ├── components/
│ │ │ └── BikeMap.tsx
│ │ ├── hooks/
│ │ │ └── useMapboxMap.ts
│ │ ├── styles/
│ │ │ └── BikeMap.scss
│ │ ├── types/
│ │ │ └── opening_hours.d.ts
│ │ └── utils/
│ │ ├── bikeMapConfig.ts
│ │ └── mapboxMapHelpers.tsx
│ └── nav/ # Navigation and layer menu
│ ├── LayersMenu.tsx
│ └── MainNav.tsx
├── shared/
│ └── utils/
│ └── mapLayers.ts # Centralized layer configuration
├── store/
│ └── layers-visibility-context.tsx # Global visibility state
├── styles/
│ └── main.scss # Global styles and CSS variables
├── App.tsx # Main layout
└── main.tsx # Entry point
```

**State management pattern:**

```typescript
// Global context for layer visibility
// Each layer can be toggled via the side menu
const initialState = Object.fromEntries(
  LAYERS_KEYS.map((layerKey) => [layerKey, true])
);
```

---

## Quick Start

```bash
git clone https://github.com/ofelipebecker/cities-and-bikes-ts.git
cd cities-and-bikes-ts
npm install
npm run dev
```

**Environment variables:** Set your Mapbox token in `.env.local`:

```env
VITE_MAPBOX_TOKEN=your_token_here
```

**Scripts:** `dev` | `build` | `preview` | `lint`

---

## Available Layers

| Layer              | Icon                                              | Description           |
| ------------------ | ------------------------------------------------- | --------------------- |
| Gas Stations       | ![gas](src/assets/images/icons/i-gas.svg)         | Fuel stations         |
| Parking            | ![parking](src/assets/images/icons/i-parking.svg) | Parking areas         |
| Stores & Workshops | ![stores](src/assets/images/icons/i-stores.svg)   | Bike shops and repair |
| Toilets            | ![toilets](src/assets/images/icons/i-toilets.svg) | Public restrooms      |

---

## Contact

**Felipe Becker** — [LinkedIn](https://linkedin.com/in/felipe-b-68968457) · [GitHub](https://github.com/ofelipebecker) · [Portfolio](https://felipebecker.com)

**Project Link:** [github.com/ofelipebecker/cities-and-bikes-ts](https://github.com/ofelipebecker/cities-and-bikes-ts)

---

**Made by Felipe Becker** | Last Updated: June 2026
