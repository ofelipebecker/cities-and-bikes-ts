import { Image } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import opening_hours from 'opening_hours';
import type { RefObject } from 'react';
import type { InteractionEvent, LngLatLike } from 'mapbox-gl';
import {
  layersIconsSrc,
  placesLabelsPt,
} from '../../../shared/utils/mapLayers.ts';

type CreatePlacePopupParams = {
  mapInstance: mapboxgl.Map;
  coordinates: LngLatLike;
  properties: Record<string, string | number | boolean>;
  layerKey: string;
};

const formatOpeningHoursPtBr = (openHours: string, coordinates: number[]) => {
  if (!openHours) {
    return '';
  }

  try {
    const [lat, lon] = coordinates;
    const nominatimObject = {
      lat,
      lon,
      address: {
        country_code: 'br',
        state: 'Santa Catarina',
      },
    };
    const normalizedOpenHours = openHours
      .replace(/\bph\b/gi, 'PH')
      .replace(/\bsh\b/gi, 'SH');
    const translationFallbacks: [string, string][] = [
      ['PH -1 day', 'véspera de feriado:'],
      ['PH +1 day', 'dia seguinte ao feriado:'],
      ['PH', 'feriado:'],
      ['SH', 'férias escolares:'],
      ['by appointment only', 'somente com agendamento'],
      ['by appointment', 'com agendamento'],
      ['closed', 'fechado'],
      ['off', 'fechado'],
      ['24/7', '24 horas'],
    ];

    const oh = new opening_hours(normalizedOpenHours, nominatimObject);
    let formatted = oh.prettifyValue({
      conf: { locale: 'pt' },
    });

    translationFallbacks.forEach(([search, replace]) => {
      formatted = formatted.replaceAll(search, replace);
    });

    return formatted;
  } catch {
    return openHours;
  }
};

const createPlacePopup = ({
  mapInstance,
  coordinates,
  properties,
  layerKey,
}: CreatePlacePopupParams) => {
  const popupNode = document.createElement('div');
  popupNode.className = 'd-flex flex-column';
  const popupRoot = createRoot(popupNode);
  const notInformed = 'Não informado';
  const isBWC = layerKey === 'toilets';

  const data = {
    icon: layersIconsSrc[layerKey],
    name: () =>
      properties.name ? String(properties.name) : placesLabelsPt[layerKey],
    address: () =>
      properties['addr:street'] && properties['addr:housenumber']
        ? `${properties['addr:street']}, ${properties['addr:housenumber']}`
        : notInformed,
    openHours: () =>
      properties.opening_hours
        ? formatOpeningHoursPtBr(
            String(properties.opening_hours),
            coordinates as number[]
          )
        : notInformed,
    phoneNum: () => (properties.phone ? String(properties.phone) : notInformed),
  };

  popupRoot.render(
    <>
      <div className='d-flex align-items-center mb-2'>
        <Image
          src={data.icon}
          alt={data.name()}
          className='me-2'
          style={{ width: 24, height: 24 }}
        />
        <h3 className='me-2 mb-0'>{data.name()}</h3>
      </div>
      <p className='mb-1'>Endereço: {data.address()}</p>
      <p className={isBWC ? 'mb-0' : 'mb-1'}>Horário: {data.openHours()}</p>
      {!isBWC && (
        <>
          <h4 className='mt-2'>Contato:</h4>
          <p className='mb-0'>{data.phoneNum()}</p>
        </>
      )}
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

      popupRef.current = createPlacePopup({
        mapInstance,
        coordinates: coordinates as LngLatLike,
        properties: properties,
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
