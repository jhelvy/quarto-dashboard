# Common packages
library(dplyr)
library(tidyr)
library(echarts4r)
library(palmerpenguins)

options(dplyr.width = Inf)

# Load and clean data
penguins_clean <- penguins |>
  filter(!is.na(bill_length_mm))

# Species colors
species_colors <- c(
  "Adelie"    = "#ff6b35",
  "Chinstrap" = "#6c5ce7",
  "Gentoo"    = "#00b894"
)
