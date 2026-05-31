export const LAYER_KEYS = ['gas', 'parking', 'stores', 'toilets'] as const;

export type LayerKey = (typeof LAYER_KEYS)[number];

const layersLabelsPt = [
  'Postos de Combustível',
  'Estacionamento',
  'Lojas e Oficinas',
  'Banheiros',
] as const;

const layersLabelsEn = [
  'Gas Stations',
  'Parking',
  'Stores & Workshops',
  'Toilets',
] as const;

export const layersPt = Object.fromEntries(
  LAYER_KEYS.map((key, index) => [key, layersLabelsPt[index]])
);

export const layersEn = Object.fromEntries(
  LAYER_KEYS.map((key, index) => [key, layersLabelsEn[index]])
);
