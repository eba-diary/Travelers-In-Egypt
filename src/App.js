import './css/App.css';
import Landing from './Landing';
import Footer from './global_components/Footer';
import {Route, Link, Switch, Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown} from 'react-bootstrap';
import OurTeam from './pages/about/OurTeam';
import GetInvolved from './pages/about/GetInvolved';
import OtherProjects from './pages/about/OtherProjects';
import EmmaBAndrewsDatabase from './pages/explore_databases/EBADB';
import NileDB from './pages/explore_databases/NileDB';
import BoatDB from './pages/explore_databases/BoatDB';
import ConnectingInfo from './pages/connecting_info/ConnectingInfo';
import MarkupTool from './pages/tools/MarkupTool';
import Contact from './pages/help/Contact';
import FAQ from './pages/help/FAQ';
import SiteInstructions from './pages/help/SiteInstructions';


const NAVLINKS = [
  ['About', ['Our Team', 'Get Involved', 'Other Projects']],
  ['Explore Databases', ['Emma B Andrews Database', 'Nile Travelogues Datbase', 'Boat Passenger Database']],
  ['Tools', ['Historical Markup Tool']],
  ['Help', ['Site Instructions', 'FAQ', 'Contact']]
];

function App() {
  return (
    <div>
      <header>
        <RenderNav />
      </header>
      <main>
        <div className='container'>
          <Switch>
            <Route exact path='/' render={Landing} />
            <Route path='/OurTeam' render={OurTeam} />
            <Route path='/GetInvolved' render={GetInvolved}/>
            <Route path='/OtherProjects' render={OtherProjects}/>
            <Route path='/EmmaBAndrewsDatabase' render={EmmaBAndrewsDatabase} />
            <Route path='/NileTraveloguesDatbase' render={NileDB} />
            <Route path='/BoatPassengerDatabase' render={BoatDB} />
            <Route path='/ConnectingInformation' render={ConnectingInfo} />
            <Route path='/HistoricalMarkupTool' render={MarkupTool} />
            <Route path='/SiteInstructions' render={SiteInstructions} />
            <Route path='/FAQ' render={FAQ} />
            <Route path='/Contact' render={Contact} />
            <Redirect to='/' />
          </Switch>
        </div>
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </div>
  );
}

function RenderNav() {

  let navigation =
    <Navbar className='bg-white' fixed='top' collapseOnSelect expand='md'>
      <Navbar.Brand>
        <div className='mx-4'>
          <Link to='/' className='link'> 
            <div>
              EBA Diaries
            </div>
          </Link>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle className='mx-4' aria-controls='responsive-navbar-nav'/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='mr-auto'>
          <NavComponents links={NAVLINKS[0]}/>
          <NavComponents links={NAVLINKS[1]}/>
          <Nav.Link href='/ConnectingInformation'>Connecting Information</Nav.Link>
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
      <NavDropdown.Item href={'/' + link.split(" ").join("")} key={link}>
          {link}
      </NavDropdown.Item>;
    return navItems;
  });

  return (
    <NavDropdown title={props.links[0]}>{item}</NavDropdown>
  );
}

// can be used to toggle different footers for later
// function useWindowSize() {
//   const [size, setSize] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => {
//       setSize(window.innerWidth);
//     }
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     }
//   }, []);
//   return size;
// }

export default App;
