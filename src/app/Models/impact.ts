// HU08 - Impacto Ambiental (CO2e). Espejo del ImpactResponseDTO del backend.
export interface CategoryImpact {
  category: string;
  items: number;
  co2SavedKg: number;
}

export interface Impact {
  co2SavedKg: number;
  itemsReused: number;
  tradesCompleted: number;
  source: string; // "climatiq" | "estimado"
  breakdown: CategoryImpact[];
}
