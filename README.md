# zuhaib khan's portfolio

my personal site: a clickable 3D turntable on the landing page, a vinyl wheel you scroll to navigate, my projects, an about page, and brian_rot (music and movie takes nobody asked for).

**live:** TODO: add the production URL

## stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- react-three-fiber + drei for the 3D turntable
- framer-motion for animation
- Vercel Analytics, hosted on Vercel

## run it locally

needs Node.js 20+.

```bash
npm install
npm run dev
```

then open http://localhost:3000.

other scripts:

```bash
npm run lint    # eslint
npm run build   # production build
npm run start   # serve the production build
```

optional: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) so Open Graph image URLs are absolute. on Vercel it falls back to the production domain automatically.

## where things live

- `src/app/` holds the routes. each `page.tsx` is a server component (metadata), and the interactive part sits next to it in a `*Client.tsx` file
- `src/components/Turntable.tsx` is the 3D scene, `SiteControls.tsx` has the home + mute buttons
- `src/context/AudioContext.tsx` handles the background music (only loads once you click the turntable)
- `public/vinyl_player.glb` is the turntable model, optimized with [gltf-transform](https://gltf-transform.dev) (webp textures at 1024px, meshopt)

## credits

- 3D turntable model (`public/vinyl_player.glb`): TODO: author, source link, license
- vinyl texture (`public/vinyl_texture.png`): TODO: source
- music (`public/music/`): TODO: track names, artists, and usage rights
- movie posters, album covers and meme images belong to their respective owners
