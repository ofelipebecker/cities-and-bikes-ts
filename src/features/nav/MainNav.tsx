import { Badge, Container, Image, Navbar, Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/logo-ctb-horizontal-dark-pt.svg';
import LayersMenu from './LayersMenu.tsx';

const MainNav = () => (
  <Navbar expand={false} className='bg-cyan-500 shadow-1'>
    <Container fluid>
      <Navbar.Toggle className='fs-3' />
      <Navbar.Brand href='/' className='d-flex me-auto ms-3'>
        <Image src={logo} />
        <Badge pill bg='dark' className='ms-2 align-self-start text-cyan-100'>
          beta
        </Badge>
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
