import { Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/logo-ctb-horizontal-dark-pt.svg';
import { useLayersVisibility } from '../../store/layers-visibility-context.tsx';
import { layersPt } from '../../shared/utils/mapLayers.ts';

const MainNav = () => {
  const { layerVisibility, setLayerVisibility } = useLayersVisibility();

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
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              {Object.entries(layersPt).map(([key, label]) => (
                <Nav.Link href='/' key={key}>
                  {layerVisibility[key] && '✓ '}
                  {label}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MainNav;
