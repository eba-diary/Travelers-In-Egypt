import './css/App.css';
import {Route, Switch, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import navBarList from './navbar.json';
import logo from './img/WebLogo.png';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, 
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } 
from 'reactstrap';

import { OurTeam, GetInvolved, OtherProjects,
  EmmaBAndrewsDatabase, NileDB, BoatDB, 
  LMLExhibit, TMDExcavations, SocialNetwork, 
  MarkupTool, Contact, FAQ, SiteInstructions} 
from './pages';
import { Landing, Footer } from './stand_alone_pages';

const PAGES = [OurTeam, GetInvolved, OtherProjects,
  EmmaBAndrewsDatabase, NileDB, BoatDB,
  LMLExhibit, TMDExcavations, SocialNetwork, 
  MarkupTool, SiteInstructions, FAQ, Contact
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

  return (
	<div>
	  <header>
		<div>
		  <TopLevelNav />
		</div>
	  </header>
	  <main className='content'>
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
		  padding: '10px'}} light expand='md'>
		<NavbarBrand href='/'>
			<img className="web-logo" src={logo} alt="Travelers in Egypt logo"/>
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
	<UncontrolledDropdown style={{borderRadius: '20px'}} nav inNavbar> 
	  <DropdownToggle style={{color: '#000000'}} nav caret>
		  {props.links.header}
	  </DropdownToggle>
	  <DropdownMenu right>
		  {dropdownItem}
	  </DropdownMenu>
	</UncontrolledDropdown>
  </div>
  );
}

export default App;
