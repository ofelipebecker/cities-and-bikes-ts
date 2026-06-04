import { bikeMapConfig, bikeMapLayersUrls } from './../utils/bikeMapConfig';
import { type RefObject, useEffect, useRef } from 'react';
import mapboxgl, { type InteractionEvent, type LngLatLike } from 'mapbox-gl';
import { useLayersVisibility } from '../../../store/layers-visibility-context.tsx';
import { layersIconsSrc } from '../../../shared/utils/mapLayers.ts';

export type PopupInfo = {
  name: string;
  address: string;
  openHours: string;
  phoneNum?: string;
};

const createPopupHtml = (popupInfo: PopupInfo, layerKey: string) => {
  const { name, address, openHours, phoneNum } = popupInfo;
  const icon = layersIconsSrc[layerKey];
  return `
    <div class='d-flex align-items-center'>
      <img src=${icon} alt=${icon} class='me-2' />
      <h3 class='me-2'>${name}</h3>
    </div>
    <p>${address}</p>
    <p>Horário: ${openHours}</p>
    <h4>Contato:</h4>${phoneNum}
  `;
};

const setLayerInteractions = (
  mapInstance: mapboxgl.Map,
  layerKey: string,
  popupRef: RefObject<mapboxgl.Popup | null>
) => {
  const layerId = `layer-${layerKey}`;

  mapInstance.addInteraction(`click-${layerKey}`, {
    type: 'click',
    target: { layerId },
    handler: (event: InteractionEvent) => {
      if (!event.feature) return;

      if (popupRef.current) {
        popupRef.current.remove();
      }

      const { geometry, properties } = event.feature;
      const coordinates = (geometry as GeoJSON.Point).coordinates.slice();

      const popupInfo = {
        name: String(properties.name),
        address: `${properties['addr:street']}, ${properties['addr:housenumber']}`,
        openHours: String(properties.opening_hours),
        phoneNum: String(properties.phone),
      };

      const popUpHtml = createPopupHtml(popupInfo, layerKey);

      popupRef.current = new mapboxgl.Popup()
        .setLngLat(coordinates as LngLatLike)
        .setHTML(popUpHtml)
        .setMaxWidth('300px')
        .addTo(mapInstance);
    },
  });

  mapInstance.addInteraction(`hover-enter-${layerKey}`, {
    type: 'mouseenter',
    target: { layerId },
    handler: () => {
      mapInstance.getCanvas().style.cursor = 'pointer';
    },
  });

  mapInstance.addInteraction(`hover-leave-${layerKey}`, {
    type: 'mouseleave',
    target: { layerId },
    handler: () => {
      mapInstance.getCanvas().style.cursor = '';
    },
  });
};

const addLayerToMap = (
  mapboxMapInstance: mapboxgl.Map,
  layerKey: string,
  layerUrl: string,
  isVisible: boolean
) => {
  const sourceId = `source-${layerKey}`;
  const layerId = `layer-${layerKey}`;
  const tilesetId = `ctb-${layerKey}`;
  const iconName = `i-${layerKey}`;

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
