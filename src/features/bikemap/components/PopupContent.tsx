import { layersIconsSrc } from '../../../shared/utils/mapLayers.ts';

type PopupInfo = {
  name: string;
  address: string;
  openHours: string;
  phoneNum?: string;
};

const PopupContent = ({
  popupInfo,
  layerKey,
}: {
  popupInfo: PopupInfo;
  layerKey: string;
}) => {
  const { name, address, openHours, phoneNum } = popupInfo;
  const icon = layersIconsSrc[layerKey];

  return (
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
};

export default PopupContent;
