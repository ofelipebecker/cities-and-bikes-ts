import { Container, Image, Navbar, Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/logo-ctb-horizontal-dark-pt.svg';
import LayersMenu from './LayersMenu.tsx';

const MainNav = () => (
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
          <LayersMenu />
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
);

export default MainNav;
