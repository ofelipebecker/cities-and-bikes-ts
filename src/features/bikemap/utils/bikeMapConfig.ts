import { type LngLatLike, type LngLatBoundsLike } from 'mapbox-gl';

type BikeMapConfig = {
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
