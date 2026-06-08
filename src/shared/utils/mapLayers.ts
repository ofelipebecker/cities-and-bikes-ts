export const LAYERS_KEYS = ['gas', 'parking', 'stores', 'toilets'] as const;

export type LayerKey = (typeof LAYERS_KEYS)[number];

const layersLabelsTextsPt = [
  'Postos de Combustível',
  'Estacionamentos',
  'Lojas e Oficinas',
  'Banheiros',
] as const;

const placesLabelsTexts = [
  'Posto de Combustível',
  'Estacionamento',
  'Loja/Oficina',
  'Banheiro',
] as const;

export const layersLabelsPt = Object.fromEntries(
  LAYERS_KEYS.map((layerKey, index) => [layerKey, layersLabelsTextsPt[index]])
);

export const layersIconsSrc = Object.fromEntries(
  LAYERS_KEYS.map((layerKey) => [
    layerKey,
    new URL(`/src/assets/images/icons/i-${layerKey}.svg`, import.meta.url).href,
  ])
);

export const placesLabelsPt = Object.fromEntries(
  LAYERS_KEYS.map((layerKey, index) => [layerKey, placesLabelsTexts[index]])
);
