import { Form, Image } from 'react-bootstrap';
import { useLayersVisibility } from '../../store/layers-visibility-context.tsx';
import {
  type LayerKey,
  LAYERS,
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
      {LAYERS.map((layer) => {
        const visibility = layersVisibility[layer];
        const icon = layersIconsSrc[layer];
        const label = layersLabelsPt[layer];

        return (
          <Form.Check
            type='switch'
            className='align-items-center d-flex my-4'
            key={`switch-${layer}`}
          >
            <Form.Check.Input
              checked={visibility}
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
