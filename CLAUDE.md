# CLAUDE.md

This is a **Quarto website** demo showcasing the [Palmer Penguins](https://allisonhorst.github.io/palmerpenguins/) dataset using multiple visualization technologies in a single static site.

## Project Structure

```
_quarto.yml         # Site config: website type, sidebar nav, theme (flatly), CSS
setup.R             # Shared R setup: loads packages, cleans data, defines species colors
styles.css          # Custom CSS: species colors, Inter font, sidebar/table/iframe styling
index.qmd           # Home page
about.qmd           # Dataset overview with species counts (uses setup.R)
species.qmd         # Species boxplots via echarts4r
islands.qmd         # Island scatter/bar charts via echarts4r with Quarto tabs
explorer.qmd        # Interactive shinylive Shiny app (WebAssembly)
penguins-d3.qmd     # D3 waffle chart via React iframe
data.qmd            # Full dataset table via reactable
tech-stack.qmd      # Architecture and how-to docs
react-chart/        # Vite + React + D3 project; build with `npm run build`
chunks/             # Reusable Quarto chunk files
_extensions/        # Quarto extensions (shinylive)
```

## Key Conventions

- **R pages** source `setup.R` to get `penguins_clean`, `species_colors`, and loaded packages (`dplyr`, `tidyr`, `echarts4r`, `palmerpenguins`)
- **Species colors:** Adelie `#ff6b35`, Chinstrap `#6c5ce7`, Gentoo `#00b894`
- All code blocks use `echo: false` (set globally in `_quarto.yml`)
- The React chart (`react-chart/`) must be built before `quarto render`; its `dist/` output is copied to `_site/` via `resources` in `_quarto.yml`
- The site is type `website`, not type `dashboard`

## Build Commands

```bash
# Install shinylive extension (first time only)
quarto add quarto-ext/shinylive

# Build the React/D3 chart (run after any changes to react-chart/)
cd react-chart && npm install && npm run build && cd ..

# Preview locally
quarto preview

# Build static site to _site/
quarto render
```

## Technologies

| Page | Technology |
|---|---|
| Species Overview, Island Comparison | echarts4r (R wrapper for Apache ECharts) |
| Explorer | Shinylive (Shiny → WebAssembly, runs in browser) |
| D3 Visualization | React + D3, built with Vite, embedded via `<iframe>` |
| Data | reactable (interactive R data table) |
