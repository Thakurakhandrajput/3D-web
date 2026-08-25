# MAISON GRID — 3D Clothing Store Sample (Webglut)

A working Node.js/Express/EJS demo built to answer the client's brief:
3D-animated feel, 50-product catalogue, slots ready for AI model video
and per-garment 3D try-on.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:3000

## What's included

- **Home** (`/`) — full-bleed hero with a live, draggable Three.js 3D mesh
  standing in for a garment render, plus a 6-item capsule preview.
- **Shop** (`/shop`) — all 50 SKUs with category filtering, generated from
  `data/products.js`.
- Product images are placeholder (picsum.photos) — swap for real photography
  or AI model stills/video once the client provides assets.
- Pieces flagged `threeD: true` in the data file show a "3D READY" tag —
  use this to signal which SKUs get the full 3D try-on treatment first.

## Swapping in real content

- **Products**: edit `data/products.js` — each entry is `{ name, category,
  fabric, colorway, price, threeD, seed }`. Real inventory can be pulled
  from a database or the client's ecommerce backend instead.
- **3D hero**: `public/js/hero3d.js` currently renders an abstract torus-knot
  "ribbon." Replace the geometry with an imported `.glb`/`.gltf` garment scan
  (via `GLTFLoader`) once one is available.
- **AI model video**: the hero and pitch sections have layout space reserved
  for a video element — drop an MP4/WebM in `public/video/` and swap the
  relevant `<img>`/canvas block for a `<video>` tag.
