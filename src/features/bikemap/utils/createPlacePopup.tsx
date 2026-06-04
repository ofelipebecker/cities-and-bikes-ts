import mapboxgl, { type LngLatLike } from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import { layersIconsSrc } from '../../../shared/utils/mapLayers.ts';

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
  const popupRoot = createRoot(popupNode);

  const { name, address, openHours, phoneNum } = popupInfo;
  const icon = layersIconsSrc[layerKey];

  popupRoot.render(
    <div className='d-flex flex-column'>
      <div className='d-flex align-items-center mb-2'>
        <img
          src={icon}
          alt={name}
          className='me-2'
          style={{ width: 24, height: 24 }}
        />
        <h3 className='me-2 mb-0'>{name}</h3>
      </div>
      <p className='mb-1'>{address}</p>
      <p className='mb-1'>Horário: {openHours}</p>
      {phoneNum && (
        <>
          <h4 className='mt-2'>Contato:</h4>
          <p>{phoneNum}</p>
        </>
      )}
    </div>
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

export default createPlacePopup;
