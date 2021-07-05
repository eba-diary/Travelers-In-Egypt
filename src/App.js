import './css/App.css';
import Landing from './Landing';
import Footer from './global_components/Footer';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown} from 'react-bootstrap';


const NAVLINKS = [
  ['About', ['Our Team', 'Get Involved', 'Other Projects']],
  ['Explore Databases', ['Emma B.Andrews Database', 'Nile Travelogues Datbase', 'Boat Passenger Database']],
  ['Tools', ['Historical Markup Tool']],
  ['Help', ['Site Instructions', 'FAQ', 'Contact']]
];

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
    <Navbar fixed='top' collapseOnSelect expand='md'>
      <Navbar.Brand href='#'>
        <div className='mx-4'>
          EBA Diaries
        </div>
      </Navbar.Brand>
      <Navbar.Toggle className='mx-4' aria-controls='responsive-navbar-nav'/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='mr-auto'>
          <NavComponents links={NAVLINKS[0]}/>
          <NavComponents links={NAVLINKS[1]}/>
          <Nav.Link href='#action11'>Connecting Information</Nav.Link>
          <NavComponents links={NAVLINKS[2]}/>
          <NavComponents links={NAVLINKS[3]}/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  return (
    <div>
      {navigation}
    </div>
  );
}

function NavComponents(props) {
  let item = props.links[1].map((link) => {
    let navItems = 
      <NavDropdown.Item href={'#' + link.split(" ").join("")}>
          {link}
      </NavDropdown.Item>;
    return navItems;
  });

  return (
    <NavDropdown title={props.links[0]}>{item}</NavDropdown>
  );
}

export default App;
