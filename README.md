# Pramod Chakraworty — Portfolio

A responsive, single-page portfolio built with **Next.js App Router, React, and TypeScript**. Content is based on the supplied résumé.

## Run locally

```sh
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Production

```sh
npm run typecheck
npm run build
```

Next.js exports the website to `out/` for static hosting. Run `npm start` to preview the production build at `http://localhost:3000`, or serve `out/` with any static web server. Set `PORT` to use a different preview port.

## Features

- Responsive navigation with active section indicators and a mobile menu
- Animated mobile mockups, a moving technology ribbon, scroll reveals, and animated statistics
- Filterable projects and accessible native project detail dialogs
- Downloadable résumé, email copy button, LinkedIn, and telephone links
- Self-hosted typography, original SVG interface illustrations, and reduced-motion support
- Search and social metadata

Edit portfolio content in `app/page.tsx` and styling in `app/globals.css`. Public assets and the résumé are in `public/`. Visualible Reader and Veels use supplied project images; the other interface visuals are conceptual illustrations.
