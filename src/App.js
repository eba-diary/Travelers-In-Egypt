
import './css/App.css';
import {Route, Switch, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import navBarList from './navbar.json';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem }
from 'reactstrap';

import { OurTeam, GetInvolved, OtherProjects,
  EmmaBAndrewsDatabase, NileDB, BoatDB,
  ConnectingInfo, MarkupTool, Contact, FAQ,
  SiteInstructions }
from './pages';
import { Landing, Footer } from './stand_alone_pages';


const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const express = require("express");
const { handleError, HandleableError } = require("./errorhandler")
// const clientRouter = require("./routers/client-router");
const config = require("./config.json");

const app = express();
app.set("view engine", "ejs");

// app.use("/", clientRouter);

app.get("/api/travelers/", async function(req, res, next){
  res.type("json");
  try {
    let db = await getDB();
    let rows = await db.all(`SELECT t.id, t.name, t.nationality,
                              c.type contribution_type, p.id publication_id,
                              p.title publication_title, (p.iiif IS NOT NULL) canread
                            FROM travelers t
                            LEFT JOIN contributions c ON t.id == c.traveler_id
                            INNER JOIN publications p ON c.publication_id == p.id
                            ORDER BY name COLLATE NOCASE ASC`);
    db.close();
    let travelers = new Map();
    for (let traveler of rows) {
      let publication = {
        id: traveler.publication_id,
        title: traveler.publication_title,
        contribution: traveler.contribution_type,
        canread: traveler.canread
      };
      if (travelers.has(traveler.id)) {
        travelers.get(traveler.id).publications.push(publication);
      } else {
        traveler.publications = [publication];
        delete traveler.publication_id;
        delete traveler.publication_title;
        delete traveler.contribution_type;
        travelers.set(traveler.id, traveler)
      }
    }
    res.send(Array.from(travelers.values()));
  } catch (error) {
    next(error);
  }
});

async function getDB() {
  return await sqlite.open({
    filename: config["db_filename"],
    driver: sqlite3.Database
  });
}

app.use(function(err, req, res, next) {
  console.log(err);
  handleError(err, res);
});

app.use(function (req, res) {
  res.status(404).render("pages/404");
})

const PAGES = [OurTeam, GetInvolved, OtherProjects,
  EmmaBAndrewsDatabase, NileDB, BoatDB,
  ConnectingInfo, MarkupTool, SiteInstructions,
  FAQ, Contact
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

app.listen(process.env.PORT || config["port"]);
export default App;
