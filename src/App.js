import './css/App.css';
import {Route, Switch, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import NavBarList from './global_components/navbar.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {   Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
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


function App() {
  return (
    <div>
      <header>
        <div className='nav-bar'>
          <RenderNav />
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
    <div>
      <Navbar expand='md' light>
        <NavbarBrand>
          <div className='title-link'>
            <a className='eba-font' href='/'>Travelers <br/> In Egypt</a>
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <div className='nav-collapse'>
          <Nav className='mr-auto' navbar>
            {NavBarList.map((link) => {
              let nav = <NavComponents links={link}/>
              return nav;
            })}
          </Nav>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

function NavComponents(props) {
  let item = props.links.pages.map((link) => {
    let navItems =
        <DropdownItem href={link.split(' ').join('')} key={link}>
            {link}
        </DropdownItem>
    return navItems;
  });

  return (
    <div>
    <UncontrolledDropdown nav inNavbar> 
      <DropdownToggle nav>
        <div className='dd-toggle'>
          {props.links.header}
          <div className='fa-caret'>
            <FontAwesomeIcon icon={faCaretDown} className='fa-icon'/>
          </div>
        </div>
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
