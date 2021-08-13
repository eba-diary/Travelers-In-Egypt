import './css/App.css';
import {Route, Switch, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import NavBarList from './global_components/navbar.json';
import { FaCaretDown } from 'react-icons/fa';
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
  
  let pageJSON = NavBarList.map((pages) => {
    let pageArr = pages.pages;
    return pageArr;
  }).reduce((acc, page) => {
    let values = page.toString();
    acc += values + ','
    return acc;
  }, '').split(',');

  pageJSON.pop();

  let routes = pageJSON.map((value, index) => {
    return (
      <Route path={value.split(' ').join('')} render={PAGES[index]} />
    );
  })

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
              { pageJSON.map((value, index) => {
                  let path = value.split(' ').join('');
                  console.log(path);
                  return <Route path={'/' + path} render={PAGES[index]} />;
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
            <FaCaretDown className='fa-icon'/>
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

export default App;
