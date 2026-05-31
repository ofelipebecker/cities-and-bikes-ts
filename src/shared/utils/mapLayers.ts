export const LAYERS = ['gas', 'parking', 'stores', 'toilets'] as const;

export type LayerKey = (typeof LAYERS)[number];

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
  LAYERS.map((layer, index) => [layer, layersLabelsTextsPt[index]])
);

export const layersLabelsEn = Object.fromEntries(
  LAYERS.map((layer, index) => [layer, layersLabelsTextsEn[index]])
);

export const layersIconsSrc = Object.fromEntries(
  LAYERS.map((layer) => [layer, `src/assets/images/icons/i-${layer}.svg`])
);
