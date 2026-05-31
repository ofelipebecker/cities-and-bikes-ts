export const LAYERS = ['gas', 'parking', 'stores', 'toilets'] as const;

export type LayerKey = (typeof LAYERS)[number];

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
  LAYERS.map((layer, index) => [layer, layersLabelsPt[index]])
);

export const layersEn = Object.fromEntries(
  LAYERS.map((layer, index) => [layer, layersLabelsEn[index]])
);

export const layersIconsSrc = Object.fromEntries(
  LAYERS.map((layer) => [layer, `src/assets/images/icons/i-${layer}.svg`])
);
