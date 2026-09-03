# ⚖️ Equilio

A Vue 3 app for tracking balance/challenges data, with charts backed by Supabase (originally prototyped as "woltapp").

## Features

- 📈 **Charts** — line and bar chart components (`LineChart.vue`, `BarChart.vue`) built on Chart.js, including a moment.js time adapter
- 🗄️ **Supabase backend** — data fetched via a Supabase client (`lib/supabaseClient.js`, `lib/fetch.js`)
- 🏆 **Challenges & balance pages** — dedicated views (`Home`, `Balance`, `Challenges`) for different parts of the app
- 🎞️ **Motion** — page/element animation via `@vueuse/motion`
- 📱 **Installable** — PWA support via `vite-plugin-pwa`

## Installation

```bash
git clone <this repo>
cd Equilio
npm install
```

You'll also need to configure Supabase credentials (see `src/lib/supabaseClient.js` for the expected env vars).

## Usage

```bash
npm run dev
```

Then open the printed local URL (default Vite port, typically [http://localhost:5173](http://localhost:5173)).

## Built with

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- [Chart.js](https://www.chartjs.org/) / vue-chartjs
- Font Awesome icons

## Status

🚧 Prototype — the internal package name (`woltapp`) suggests this started as something else and was repurposed; still depends on a live Supabase project to function.
