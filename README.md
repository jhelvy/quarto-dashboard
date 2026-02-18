# Palmer Penguins Dashboard

A demo [Quarto](https://quarto.org) website showcasing how multiple visualization technologies can be integrated into a cohesive, **fully static** dashboard — no server required.

Data from the [palmerpenguins](https://allisonhorst.github.io/palmerpenguins/) R package. Artwork by [Allison Horst](https://allisonhorst.github.io/).

## Pages

| Page | Description | Technology |
|---|---|---|
| Home | Landing page overview | — |
| About | Dataset background, species info, measurements | R (inline) |
| Species Overview | Body measurement boxplots by species | echarts4r |
| Island Comparison | Scatter plots and composition charts | echarts4r + Quarto tabs |
| Explorer | Interactive filtering and plotting | Shinylive (WebAssembly) |
| D3 Visualization | Waffle chart with hover highlighting | React + D3 (Vite) |
| Data | Full searchable/filterable dataset table | reactable |
| Tech Stack | Architecture notes and how-to | — |

## Getting Started

### Prerequisites

- [Quarto](https://quarto.org/docs/get-started/) CLI
- R with packages: `dplyr`, `tidyr`, `echarts4r`, `palmerpenguins`, `reactable`, `shiny`, `bslib`
- Node.js (for the React/D3 chart)

### Build & Preview

```bash
# 1. Install the shinylive Quarto extension
quarto add quarto-ext/shinylive

# 2. Build the React + D3 chart
cd react-chart && npm install && npm run build && cd ..

# 3. Preview locally
quarto preview

# 4. Build the static site to _site/
quarto render
```

## Architecture

The site is built as a `type: website` Quarto project (not using the Quarto `dashboard` format), which provides sidebar navigation, full-page layout, and per-page table of contents.

- **Theme:** Bootstrap Flatly via Quarto
- **Custom CSS:** `styles.css` — species color palette, Inter font, styled components
- **Shared R setup:** `setup.R` — loaded by each R page; cleans data and defines species colors

## Links

- [palmerpenguins R package](https://allisonhorst.github.io/palmerpenguins/)
- [Quarto](https://quarto.org)
- [echarts4r](https://echarts4r.john-coene.com)
- [Shinylive](https://shinylive.io)
- [React](https://react.dev) / [D3](https://d3js.org)
