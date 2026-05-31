import { Container, Form, Image, Navbar, Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/logo-ctb-horizontal-dark-pt.svg';
import { useLayersVisibility } from '../../store/layers-visibility-context.tsx';
import {
  type LayerKey,
  LAYER_KEYS,
  layersPt,
} from '../../shared/utils/mapLayers.ts';

const MainNav = () => {
  const { layerVisibility, setLayerVisibility } = useLayersVisibility();

  function handleLayerVisibility(layerKey: LayerKey) {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  }

  return (
    <Navbar expand={false} className='bg-cyan-500 shadow-1'>
      <Container fluid>
        <Navbar.Toggle className='fs-3' />
        <Navbar.Brand href='/' className='me-auto ms-3'>
          <Image src={logo} />
        </Navbar.Brand>
        <Navbar.Offcanvas placement='start' className='bg-gray-200'>
          <Offcanvas.Header closeButton className='align-items-start'>
            <Offcanvas.Title>
              <Image src={logo} />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MainNav;
