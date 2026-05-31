import { Form, Image } from 'react-bootstrap';
import { useLayersVisibility } from '../../store/layers-visibility-context.tsx';
import {
  type LayerKey,
  LAYERS,
  layersPt,
  layersIconsSrc,
} from '../../shared/utils/mapLayers.ts';

const LayersMenu = () => {
  const { layerVisibility, setLayerVisibility } = useLayersVisibility();

  function handleLayerVisibility(layerKey: LayerKey) {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  }

  return (
    <Form>
      {LAYERS.map((layer) => {
        const visisbility = layerVisibility[layer];
        const icon = layersIconsSrc[layer];
        const label = layersPt[layer];

        return (
          <Form.Check
            type='switch'
            className='align-items-center d-flex my-4'
            key={`switch-${layer}`}
          >
            <Form.Check.Input
              checked={visisbility}
              onChange={() => handleLayerVisibility(layer)}
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
