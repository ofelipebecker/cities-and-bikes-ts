import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import type { RefObject } from 'react';
import type { InteractionEvent, LngLatLike } from 'mapbox-gl';
import {
  layersIconsSrc,
  placesLabelsPt,
} from '../../../shared/utils/mapLayers.ts';

type PopupInfo = {
  name: string;
  address: string;
  openHours: string;
  phoneNum?: string;
};

type CreatePlacePopupParams = {
  mapInstance: mapboxgl.Map;
  coordinates: LngLatLike;
  popupInfo: PopupInfo;
  layerKey: string;
};

const createPlacePopup = ({
  mapInstance,
  coordinates,
  popupInfo,
  layerKey,
}: CreatePlacePopupParams) => {
  const popupNode = document.createElement('div');
  popupNode.className = 'd-flex flex-column';
  const popupRoot = createRoot(popupNode);

  const { name, address, openHours, phoneNum } = popupInfo;
  const icon = layersIconsSrc[layerKey];

  popupRoot.render(
    <>
      <div className='d-flex align-items-center mb-2'>
        <img
          src={icon}
          alt={name}
          className='me-2'
          style={{ width: 24, height: 24 }}
        />
        <h3 className='me-2 mb-0'>{name}</h3>
      </div>
      <p className='mb-1'>Endereço: {address}</p>
      <p className='mb-1'>Horário: {openHours}</p>{' '}
      <h4 className='mt-2'>Contato:</h4>
      <p>{phoneNum}</p>
    </>
  );

  const popup = new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setDOMContent(popupNode)
    .setMaxWidth('300px')
    .addTo(mapInstance);

  popup.on('close', () => {
    popupRoot.unmount();
  });

  return popup;
};

export const setLayerInteractions = (
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

      const notInformed = 'Não informado';

      const popupInfo = {
        name: properties.name
          ? String(properties.name)
          : placesLabelsPt[layerKey],
        address:
          properties['addr:street'] && properties['addr:housenumber']
            ? `${properties['addr:street']}, ${properties['addr:housenumber']}`
            : notInformed,
        openHours: properties.opening_hours
          ? String(properties.opening_hours)
          : notInformed,
        phoneNum: properties.phone ? String(properties.phone) : notInformed,
      };

      popupRef.current = createPlacePopup({
        mapInstance,
        coordinates: coordinates as LngLatLike,
        popupInfo,
        layerKey,
      });
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

export const addLayerToMap = (
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
