import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import type { RefObject } from 'react';
import { useLayersVisibility } from '../../../store/layers-visibility-context.tsx';
import { bikeMapConfig, bikeMapLayersUrls } from './../utils/bikeMapConfig';
import {
  addLayerToMap,
  setLayerInteractions,
} from '../utils/mapboxMapHelpers.tsx';

const useMapboxMap = (containerRef: RefObject<HTMLDivElement | null>) => {
  const mapboxMapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const { layersVisibility } = useLayersVisibility();

  useEffect(() => {
    if (!containerRef.current) return;

    const mapboxMapInstance = new mapboxgl.Map({
      container: containerRef.current,
      ...bikeMapConfig,
    });

    mapboxMapRef.current = mapboxMapInstance;

    mapboxMapRef.current.addControl(new mapboxgl.NavigationControl());

    mapboxMapInstance.on('load', () => {
      Object.entries(bikeMapLayersUrls).forEach(([layerKey, layerUrl]) => {
        addLayerToMap(
          mapboxMapInstance,
          layerKey,
          layerUrl,
          layersVisibility[layerKey]
        );

        setLayerInteractions(mapboxMapInstance, layerKey, popupRef);
      });
    });

    return () => {
      mapboxMapInstance.remove();
      mapboxMapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const currentMapInstance = mapboxMapRef.current;
    if (!currentMapInstance || !currentMapInstance.isStyleLoaded()) return;

    Object.entries(layersVisibility).forEach(([layerKey, isVisible]) => {
      if (currentMapInstance.getLayer(`layer-${layerKey}`)) {
        currentMapInstance.setLayoutProperty(
          `layer-${layerKey}`,
          'visibility',
          isVisible ? 'visible' : 'none'
        );
      }
    });
  }, [layersVisibility]);

  return mapboxMapRef;
};

export default useMapboxMap;
