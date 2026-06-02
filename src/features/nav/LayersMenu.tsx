import { Form, Image } from 'react-bootstrap';
import { useLayersVisibility } from '../../store/layers-visibility-context.tsx';
import {
  type LayerKey,
  LAYERS_KEYS,
  layersLabelsPt,
  layersIconsSrc,
} from '../../shared/utils/mapLayers.ts';

const LayersMenu = () => {
  const { layersVisibility, setLayersVisibility } = useLayersVisibility();

  function handleLayerVisibility(layerKey: LayerKey) {
    setLayersVisibility((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  }

  return (
    <Form>
      {LAYERS_KEYS.map((layerKey) => {
        const visibility = layersVisibility[layerKey];
        const icon = layersIconsSrc[layerKey];
        const label = layersLabelsPt[layerKey];

        return (
          <Form.Check
            type='switch'
            className='align-items-center d-flex my-4'
            key={`switch-${layerKey}`}
          >
            <Form.Check.Input
              checked={visibility}
              onChange={() => handleLayerVisibility(layerKey)}
            />
            <Form.Check.Label>
              <Image src={icon} alt={icon} className='me-2 ms-3' />
              {label}
            </Form.Check.Label>
          </Form.Check>
        );
      })}
    </Form>
  );
};

export default LayersMenu;
