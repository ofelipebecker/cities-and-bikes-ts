export const LAYERS_KEYS = ['gas', 'parking', 'stores', 'toilets'] as const;

export type LayerKey = (typeof LAYERS_KEYS)[number];

const layersLabelsTextsPt = [
  'Postos de Combustível',
  'Estacionamentos',
  'Lojas e Oficinas',
  'Banheiros',
] as const;

const layersLabelsTextsEn = [
  'Gas Stations',
  'Parking',
  'Stores & Workshops',
  'Toilets',
] as const;

export const layersLabelsPt = Object.fromEntries(
  LAYERS_KEYS.map((layerKey, index) => [layerKey, layersLabelsTextsPt[index]])
);

export const layersLabelsEn = Object.fromEntries(
  LAYERS_KEYS.map((layerKey, index) => [layerKey, layersLabelsTextsEn[index]])
);

export const layersIconsSrc = Object.fromEntries(
  LAYERS_KEYS.map((layerKey) => [
    layerKey,
    `src/assets/images/icons/i-${layerKey}.svg`,
  ])
);
