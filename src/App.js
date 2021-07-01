import './App.css';
import Landing from './Landing';
import Footer from './global_components/Footer';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown} from 'react-bootstrap';

function App() {
  return (
    <div>
      <body>
        <RenderNav />
        <Landing />
        <Footer />
      </body>
    </div>
  );
}

function RenderNav() {
  let navigation =
    <Navbar fixed='top' collapseOnSelect expand='md' bg='dark' variant='dark'>
      <Navbar.Brand href='#'>
        <div className='mx-4'>
          EBA Diaries
        </div>
      </Navbar.Brand>
      <Navbar.Toggle className='mx-4' aria-controls='responsive-navbar-nav'/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='mr-auto'>
          <AboutNav />
          <ExploreDbNav />
          <Nav.Link href='#action11'>Connecting Information</Nav.Link>
          <Tools />
          <Help />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  return (
    <div>
      {navigation}
    </div>
  );
}

function AboutNav() {
  return (
    <NavDropdown title='About' id='collapsible-nav-dropdown'>
      <NavDropdown.Item href='#action1'>Our Team</NavDropdown.Item>
      <NavDropdown.Item href='#action2'>Get Involved</NavDropdown.Item>
      <NavDropdown.Item href='#action3'>Other Projects</NavDropdown.Item>
    </NavDropdown>
  );
}

function ExploreDbNav() {
  return (
    <NavDropdown title='Explore Databases' id='collapsible-nav-dropdown'>
      <NavDropdown.Item href='#action4'>Emma B. Andrews Database</NavDropdown.Item>
      <NavDropdown.Item href='#action5'>Nile Travelogues Database</NavDropdown.Item>
      <NavDropdown.Item href='#action6'>Boat Passenger Database</NavDropdown.Item>
    </NavDropdown>
  );
}

function Tools() {
  return (
    <NavDropdown title='Tools'>
      <NavDropdown.Item href='#action7'>Historical Markup Tool</NavDropdown.Item>
    </NavDropdown>
  );
}

function Help() {
  return (
    <NavDropdown title='Help'>
      <NavDropdown.Item href='#action8'>Site Instructions</NavDropdown.Item>
      <NavDropdown.Item href='#action9'>FAQ</NavDropdown.Item>
      <NavDropdown.Item href='#action10'>Contact</NavDropdown.Item>
    </NavDropdown>
  );
}

export default App;
