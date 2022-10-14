import './css/App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import navBarList from './navbar.json';
import logo from './img/WebLogo.png';
import Error from './components/util/Error'

import {
	OurTeam, GetInvolved, OtherProjects,
	EmmaBAndrewsDatabase, NileDB, BoatDB,
	LMLExhibit, TMDExcavations, SocialNetwork,
	MarkupTool, Contact, FAQ, SiteInstructions
}
	from './pages';
import { Landing, Footer } from './stand_alone_pages';
import Navbar from './components/util/Navbar';
import Layout from './components/util/Layout';


const PAGES = [OurTeam, GetInvolved, OtherProjects,
	EmmaBAndrewsDatabase, NileDB, BoatDB,
	LMLExhibit, TMDExcavations, SocialNetwork,
	MarkupTool, SiteInstructions, FAQ, Contact
];

export default function App() {

	return (
		<div>
			<Routes>
				<Route exact path='/' element={<Layout index={0}><Landing /></Layout>} />
				<Route path='/OurTeam' element={<Layout index={1}><OurTeam /></Layout>} />
				<Route path='/error-page' element={<Layout index={-1}><Error /></Layout>} />
				<Route path='/redirect' element={<Layout index={-1}><Navigate to='/error-page' /></Layout>} />
			</Routes>
		</div>
	);
}
