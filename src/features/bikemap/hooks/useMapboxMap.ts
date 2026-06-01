import { bikeMapConfig, bikeMapLayersUrls } from './../utils/bikeMapConfig';
import { type RefObject, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const addLayerToMap = (
  mapboxMapInstance: mapboxgl.Map,
  layer: string,
  layerUrl: string
) => {
  const sourceId = `source-${layer}`;
  const layerId = `layer-${layer}`;
  const tilesetId = `ctb-${layer}`;
  const iconName = `i-${layer}`;

  mapboxMapInstance.addSource(sourceId, {
    type: 'vector',
    url: layerUrl,
  });

  mapboxMapInstance.addLayer({
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
};

const useMapboxMap = (containerRef: RefObject<HTMLDivElement | null>) => {
  const mapboxMapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mapboxMapInstance = new mapboxgl.Map({
      container: containerRef.current,
      ...bikeMapConfig,
    });

    mapboxMapRef.current = mapboxMapInstance;

    mapboxMapInstance.on('load', () => {
      Object.entries(bikeMapLayersUrls).forEach(([layer, layerUrl]) => {
        addLayerToMap(mapboxMapInstance, layer, layerUrl);
      });
    });

    return () => {
      mapboxMapInstance.remove();
      mapboxMapRef.current = null;
    };
  }, []);

  return mapboxMapRef;
};

export default useMapboxMap;
