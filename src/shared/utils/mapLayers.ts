export const LAYERS_KEYS = ['gas', 'parking', 'stores', 'toilets'] as const;

export type LayerKey = (typeof LAYERS_KEYS)[number];

const layersLabelsTextsPt = [
  'Postos de Combustível',
  'Estacionamento',
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
  LAYERS_KEYS.map((layer, index) => [layer, layersLabelsTextsPt[index]])
);

export const layersLabelsEn = Object.fromEntries(
  LAYERS_KEYS.map((layer, index) => [layer, layersLabelsTextsEn[index]])
);

export const layersIconsSrc = Object.fromEntries(
  LAYERS_KEYS.map((layer) => [layer, `src/assets/images/icons/i-${layer}.svg`])
);
