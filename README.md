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
- `src/components/Turntable.tsx` is the 3D turntable, `SpinningRecord.tsx` the floating record on brian_rot, `SiteControls.tsx` the home + mute buttons
- `src/context/AudioContext.tsx` handles the background music (only loads once you click the turntable)
- `public/vinyl_player.glb` is the turntable model, optimized with [gltf-transform](https://gltf-transform.dev) (webp textures at 1024px, meshopt)

## credits

- 3D turntable model (`public/vinyl_player.glb`): TODO: author, source link, license
- vinyl texture (`public/vinyl_texture.png`): TODO: source
- music (`public/music/`): TODO: track names, artists, and usage rights
- movie posters, album covers and meme images belong to their respective owners
- RealTalkTracker screenshots (`public/projects/`) are of my own app
- photos in `public/about/`, all via Wikimedia Commons (also credited at the bottom of the about page):
  - [Toronto sunrise skyline, 2014](https://commons.wikimedia.org/w/index.php?curid=57024776) by OldYorkGuy, CC BY-SA 3.0 (resized)
  - [Peter Witt streetcar on Queen Street in Toronto](https://commons.wikimedia.org/wiki/File:Peter_Witt_streetcar_on_Queen_Street_in_Toronto.jpg) by Robert Taylor, CC BY 2.0
  - [KeeleCampus2](https://commons.wikimedia.org/w/index.php?curid=19352958) by Raysonho, CC0
  - [Toronto Davisville Subway Station Postcard](https://commons.wikimedia.org/wiki/File:Toronto_Davisville_Subway_Station_Postcard_(P300544).jpg) by Royal Specialty, public domain

## design

the site is a risograph zine: newsprint paper, black ink, and two riso drums (sunflower yellow and blue). the homepage splits the name either side of the 3D turntable sitting on a sunflower disc, sections pin their heading while pictures pass by, and brian_rot has movie posters pinned crooked to a blue wall, a record crate you flip through (the pulled record slides out of its sleeve), and a floating 3D record (`src/components/SpinningRecord.tsx`) that spins faster as you scroll and leans toward the cursor. one typeface: Bricolage Grotesque.
