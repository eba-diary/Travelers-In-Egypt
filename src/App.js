import './css/App.css';
import {Route, Switch, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import navBarList from './navbar.json';
// import { FaCaretDown } from 'react-icons/fa';
import { Collapse,Navbar, NavbarToggler, NavbarBrand, Nav, 
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } 
from 'reactstrap';

import { OurTeam, GetInvolved, OtherProjects,
  EmmaBAndrewsDatabase, NileDB, BoatDB,
  ConnectingInfo, MarkupTool, Contact, FAQ, 
  SiteInstructions, Landing, Footer } 
from './export';

const PAGES = [OurTeam, GetInvolved, OtherProjects,
  EmmaBAndrewsDatabase, NileDB, BoatDB,
  ConnectingInfo, MarkupTool, SiteInstructions, 
  FAQ, Contact, SiteInstructions
];

function App() {

  // Get pages from JSON map into array.
  let pageJSON = navBarList.map((pages) => {
    let pageArr = pages.pages;
    return pageArr;
  }).reduce((acc, page) => {
    let values = page.toString();
    acc += values + ','
    return acc;
  }, '').split(',');

  pageJSON.pop();

  // Reads URL and renders corresponding page.

  return (
    <div>
      <header>
        <div className='nav-bar'>
          <TopLevelNav />
        </div>
      </header>
      <main>
          <Switch>
            <Route exact path='/' render={Landing}/>
              { pageJSON.map((value, index) => {
                  let path = value.split(' ').join('');
                  return <Route path={'/' + path} render={PAGES[index]} key={path} />;
                })
              }
            <Redirect to='/' />
          </Switch>
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </div>
  );
}

function TopLevelNav() {
  // Manage state of collapsed navigation menu.

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar style={{backgroundColor: '#DED7B9', 
          marginTop: '-10px', 
          padding: '5px'}} light expand='md'>
        <NavbarBrand href='/'>
          <div className='eba-font'>
            Travelers <br/> In Egypt
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            {navBarList.map((link, index) => {
              let nav = <DropdownPage links={link} key={index}/>
              return nav;
            })}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

function DropdownPage(props) {

  // Gets header and corresponding page names 
  // from JSON file and creates one dropdown item.

  let dropdownItem = props.links.pages.map((link, index) => {
    let pageNames =
        <DropdownItem href={link.split(' ').join('')} key={index}>
            {link}
        </DropdownItem>
    return pageNames;
  });

  return (
    <div>
    <UncontrolledDropdown nav inNavbar> 
      <DropdownToggle nav caret>
        {/* <div className='dd-toggle'> */}
          {props.links.header}
          {/* <div className='fa-caret'>
            <FaCaretDown className='fa-icon'/>
          </div> */}
        {/* </div> */}
      </DropdownToggle>
      <DropdownMenu right>
          {dropdownItem}
      </DropdownMenu>
    </UncontrolledDropdown>
  </div>
  );
}

export default App;
