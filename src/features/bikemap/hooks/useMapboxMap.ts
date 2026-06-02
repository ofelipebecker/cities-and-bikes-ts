import { bikeMapConfig, bikeMapLayersUrls } from './../utils/bikeMapConfig';
import { type RefObject, useEffect, useRef } from 'react';
import mapboxgl, { type InteractionEvent, type LngLatLike } from 'mapbox-gl';
import { useLayersVisibility } from '../../../store/layers-visibility-context.tsx';

const setLayerInteractions = (
  mapInstance: mapboxgl.Map,
  layer: string,
  popupRef: RefObject<mapboxgl.Popup | null>
) => {
  const layerId = `layer-${layer}`;

  mapInstance.addInteraction(`click-${layer}`, {
    type: 'click',
    target: { layerId },
    handler: (e: InteractionEvent) => {
      if (popupRef.current) {
        popupRef.current.remove();
      }

      const coordinates = (
        e.feature!.geometry as GeoJSON.Point
      ).coordinates.slice();
      const name = e.feature!.properties.name;

      popupRef.current = new mapboxgl.Popup()
        .setLngLat(coordinates as LngLatLike)
        .setHTML(`<h2>${name}</h2>`)
        .addTo(mapInstance);
    },
  });

  mapInstance.addInteraction(`hover-enter-${layer}`, {
    type: 'mouseenter',
    target: { layerId },
    handler: () => {
      mapInstance.getCanvas().style.cursor = 'pointer';
    },
  });

  mapInstance.addInteraction(`hover-leave-${layer}`, {
    type: 'mouseleave',
    target: { layerId },
    handler: () => {
      mapInstance.getCanvas().style.cursor = '';
    },
  });
};

const addLayerToMap = (
  mapboxMapInstance: mapboxgl.Map,
  layer: string,
  layerUrl: string,
  isVisible: boolean
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
      visibility: isVisible ? 'visible' : 'none',
      'icon-image': iconName,
      'icon-allow-overlap': false,
      'icon-anchor': 'bottom',
      'icon-size': 1.1,
    },
  });
};

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
      Object.entries(bikeMapLayersUrls).forEach(([layer, layerUrl]) => {
        addLayerToMap(
          mapboxMapInstance,
          layer,
          layerUrl,
          layersVisibility[layer]
        );

        setLayerInteractions(mapboxMapInstance, layer, popupRef);
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

    Object.entries(layersVisibility).forEach(([layer, isVisible]) => {
      if (currentMapInstance.getLayer(`layer-${layer}`)) {
        currentMapInstance.setLayoutProperty(
          `layer-${layer}`,
          'visibility',
          isVisible ? 'visible' : 'none'
        );
      }
    });
  }, [layersVisibility]);

  return mapboxMapRef;
};

export default useMapboxMap;
