import { useState, useMemo, useEffect } from 'react'
import * as d3 from 'd3'

const SPECIES_COLORS = {
  Adelie: '#ff6b35',
  Chinstrap: '#6c5ce7',
  Gentoo: '#00b894',
}

const ISLANDS = ['Biscoe', 'Dream', 'Torgersen']

const CELL_SIZE = 18
const CELL_GAP = 3
const COLS_PER_ISLAND = 10
const PANEL_PADDING = 20
const PANEL_GAP = 40
const HEADER_HEIGHT = 30

function App() {
  const [data, setData] = useState(null)
  const [hoverSpecies, setHoverSpecies] = useState(null)
  const [hoverIsland, setHoverIsland] = useState(null)

  useEffect(() => {
    d3.csv('./penguins.csv', (d) => ({
      island: d.island,
      species: d.species,
      count: +d.count,
    })).then(setData)
  }, [])

  const { panels, speciesTotals, svgWidth, svgHeight, chartHeight, maxRows, TOP_PADDING, LABEL_HEIGHT } = useMemo(() => {
    if (!data) return { panels: [], speciesTotals: {}, svgWidth: 0, svgHeight: 0 }

    const totals = {}
    data.forEach((d) => {
      totals[d.species] = (totals[d.species] || 0) + d.count
    })

    const panelWidth = COLS_PER_ISLAND * (CELL_SIZE + CELL_GAP) - CELL_GAP
    const panels = ISLANDS.map((island, i) => {
      const rows = data.filter((d) => d.island === island)
      const cells = []
      rows.forEach((row) => {
        for (let j = 0; j < row.count; j++) {
          cells.push({ species: row.species, island })
        }
      })
      const maxRows = Math.ceil(cells.length / COLS_PER_ISLAND)
      const x = i * (panelWidth + PANEL_GAP) + PANEL_PADDING
      return { island, cells, x, maxRows, width: panelWidth }
    })

    const maxRows = Math.max(...panels.map((p) => p.maxRows))
    const width = ISLANDS.length * (panelWidth + PANEL_GAP) - PANEL_GAP + PANEL_PADDING * 2
    const chartHeight = maxRows * (CELL_SIZE + CELL_GAP) - CELL_GAP
    const LABEL_HEIGHT = 30
    const TOP_PADDING = 10
    const height = TOP_PADDING + chartHeight + LABEL_HEIGHT

    return { panels, speciesTotals: totals, svgWidth: width, svgHeight: height, chartHeight, maxRows, TOP_PADDING, LABEL_HEIGHT }
  }, [data])

  if (!data) return <div className="app">Loading...</div>

  return (
    <div className="app">
      <h2>Palmer Penguins by Island</h2>
      <p className="subtitle">Each square = 1 penguin, colored by species</p>

      <div className="legend">
        {Object.entries(SPECIES_COLORS).map(([species, color]) => (
          <span
            key={species}
            className={`legend-item ${hoverSpecies === species ? 'active' : ''}`}
            onMouseEnter={() => setHoverSpecies(species)}
            onMouseLeave={() => setHoverSpecies(null)}
          >
            <span className="swatch" style={{ backgroundColor: color }} />
            {species} ({speciesTotals[species] || 0})
          </span>
        ))}
      </div>

      <svg width={svgWidth} height={svgHeight}>
        {panels.map((panel) => (
          <g
            key={panel.island}
            onMouseEnter={() => setHoverIsland(panel.island)}
            onMouseLeave={() => setHoverIsland(null)}
          >
            <rect
              x={panel.x}
              y={TOP_PADDING}
              width={panel.width}
              height={chartHeight + LABEL_HEIGHT}
              fill="transparent"
            />
            <text
              x={panel.x + panel.width / 2}
              y={TOP_PADDING + chartHeight + LABEL_HEIGHT - 5}
              textAnchor="middle"
              fontWeight="600"
              fontSize="14"
              fill={hoverIsland === panel.island ? '#111' : '#555'}
            >
              {panel.island}
            </text>
            {panel.cells.map((cell, j) => {
              const col = j % COLS_PER_ISLAND
              const row = Math.floor(j / COLS_PER_ISLAND)
              const dimmed =
                (hoverSpecies && cell.species !== hoverSpecies) ||
                (hoverIsland && cell.island !== hoverIsland)
              return (
                <rect
                  key={j}
                  x={panel.x + col * (CELL_SIZE + CELL_GAP)}
                  y={TOP_PADDING + chartHeight - (row + 1) * (CELL_SIZE + CELL_GAP) + CELL_GAP}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={3}
                  fill={SPECIES_COLORS[cell.species]}
                  opacity={dimmed ? 0.15 : 1}
                />
              )
            })}
          </g>
        ))}
      </svg>
    </div>
  )
}

export default App
