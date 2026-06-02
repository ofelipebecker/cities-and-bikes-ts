import { type LngLatLike, type LngLatBoundsLike } from 'mapbox-gl';
import { LAYERS_KEYS } from '../../../shared/utils/mapLayers.ts';

const bikeMapLayersUrlCodes = [
  'cmmuxjqjp1xea1nqhwtc3ow84-8kf0r',
  'cmmv1xxff01yq1qnwm3tifq2a-7qtdu',
  'cmmv1qpud002c1omdqg1ueap8-448rp',
  'cmmv1v6nk01yb1pmmp8h5apjp-8lsy7',
];

export const bikeMapLayersUrls = Object.fromEntries(
  LAYERS_KEYS.map((layer, index) => [
    layer,
    `mapbox://flpbecker.${bikeMapLayersUrlCodes[index]}`,
  ])
);

export type BikeMapConfig = {
  center: LngLatLike | undefined;
  style: string;
  zoom: number;
  maxBounds: LngLatBoundsLike;
};

export const bikeMapConfig: BikeMapConfig = {
  center: [-48.5952631, -27.5859315],
  style: 'mapbox://styles/flpbecker/cmmtikcer001i01qt83kv73ga',
  zoom: 12,
  maxBounds: [
    [-49.7, -28.2],
    [-47.55, -27.111771],
  ],
};
