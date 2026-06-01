import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { bikeMapConfig, bikeMapLayersUrls } from '../utils/bikeMapConfig.ts';
import '../styles/BikeMap.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const BikeMap = () => {
  const bikeMapContainerRef = useRef<HTMLDivElement | null>(null);
  const bikeMapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!bikeMapContainerRef.current) return;

    const bikeMapInstance = new mapboxgl.Map({
      container: bikeMapContainerRef.current,
      ...bikeMapConfig,
    });

    bikeMapRef.current = bikeMapInstance;

    bikeMapInstance.on('load', () => {
      Object.entries(bikeMapLayersUrls).forEach(([layer, layerUrl]) => {
        const sourceId = `source-${layer}`;
        const layerId = `layer-${layer}`;
        const tilesetId = `ctb-${layer}`;

        const iconName = `i-${layer}`;

        bikeMapInstance.addSource(sourceId, {
          type: 'vector',
          url: layerUrl,
        });

        bikeMapInstance.addLayer({
          id: layerId,
          type: 'symbol',
          source: sourceId,
          'source-layer': tilesetId,
          layout: {
            visibility: 'visible',
            'icon-image': iconName,
            'icon-allow-overlap': false,
            'icon-anchor': 'bottom',
            'icon-size': 1.1,
          },
        });
      });
    });

    return () => {
      bikeMapInstance.remove();
      bikeMapRef.current = null;
    };
  }, []);

  return <div id='bike-map-container' ref={bikeMapContainerRef} />;
};

export default BikeMap;
