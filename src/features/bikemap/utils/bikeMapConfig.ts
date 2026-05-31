import { type LngLatLike, type LngLatBoundsLike } from 'mapbox-gl';

type BikeMapConfig = {
  center: {
    coordinates: LngLatLike | undefined;
    zoom: number;
  };
  style: {
    url: string;
  };
  bounds: {
    maxBounds: LngLatBoundsLike;
    padding: number;
  };
};

export const bikeMapConfig: BikeMapConfig = {
  center: {
    coordinates: [-48.5952631, -27.5859315],
    zoom: 12,
  },
  style: {
    url: 'mapbox://styles/flpbecker/cmmtikcer001i01qt83kv73ga',
  },
  bounds: {
    maxBounds: [
      [-49.7, -28.2],
      [-47.55, -27.111771],
    ],
    padding: 50,
  },
};
