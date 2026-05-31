import { Form } from 'react-bootstrap';
import { useLayersVisibility } from '../../store/layers-visibility-context.tsx';
import {
  type LayerKey,
  LAYER_KEYS,
  layersPt,
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
      {LAYER_KEYS.map((key) => (
        <Form.Check
          type='switch'
          checked={layerVisibility[key]}
          key={`switch-${key}`}
          label={layersPt[key]}
          onChange={() => handleLayerVisibility(key)}
        />
      ))}
    </Form>
  );
};

export default LayersMenu;
