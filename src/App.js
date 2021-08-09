import './css/App.css';
import {Route, Link, Switch, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import NavBar from './global_components/NavBar';
import {   Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { OurTeam, GetInvolved, OtherProjects,
         EmmaBAndrewsDatabase, NileDB, BoatDB,
         ConnectingInfo,
         MarkupTool,
         Contact, FAQ, SiteInstructions,
         Landing, Footer} from './export';




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
        <div className='nav-bar'>
          {/* <RenderNav /> */}
          <NavBar />
        </div>
      </header>
      <main>
          <Switch>
            <Route exact path='/' render={Landing} />
            <div className='container'>
              <Route path='/OurTeam' render={OurTeam} />
              <Route path='/GetInvolved' render={GetInvolved} />
              <Route path='/OtherProjects' render={OtherProjects} />
              <Route path='/EmmaBAndrewsDatabase' render={EmmaBAndrewsDatabase} />
              <Route path='/NileTraveloguesDatbase' render={NileDB} />
              <Route path='/BoatPassengerDatabase' render={BoatDB} />
              <Route path='/ConnectingInformation' render={ConnectingInfo} />
              <Route path='/HistoricalMarkupTool' render={MarkupTool} />
              <Route path='/SiteInstructions' render={SiteInstructions} />
              <Route path='/FAQ' render={FAQ} />
              <Route path='/Contact' render={Contact} />
            </div>
            <Redirect to='/' />
          </Switch>
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </div>
  );
}

function RenderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='navbar'>
      <Navbar expand='md' bg='alert' variant='dark' light>
        <NavbarBrand>
          <NavLink href='/'>
            <div className='title-link'>
              <p className='eba-font'>Travelers In Egypt</p>
            </div>
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavComponents links={NAVLINKS[0]} />
            <NavComponents links={NAVLINKS[1]}/>
            <NavItem>
              <NavLink href='/ConnectingInformation'>
                Connecting Information
              </NavLink>
            </NavItem>
            <NavComponents links={NAVLINKS[2]}/>
            <NavComponents links={NAVLINKS[3]}/>
          </Nav>
        </Collapse>
      </Navbar>
      </div>
  );
}

function NavComponents(props) {
  let item = props.links[1].map((link) => {
    let navItems =
        <DropdownItem href={'/' + link.split(" ").join("")} key={link}>
            {link}
        </DropdownItem>
    return navItems;
  });

  return (
    <div>
    <UncontrolledDropdown nav inNavbar> 
      <DropdownToggle nav caret>
        {props.links[0]}
      </DropdownToggle>
      <DropdownMenu right>
        {item}
      </DropdownMenu>
    </UncontrolledDropdown>
  </div>
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
