import React from 'react';
import './Landing.css';
import ebaTitle from './img/EBA_title_img.jpeg';
import personalArchives from './img/personalArchives.png';
import travelogues from './img/Travelogues.png';
import tourOperators from './img/TourOperators.png';
import digitalExhibit from './img/DigitalExhibit.png';
import about from './img/About.png';
import cc from './img/cc.png';
import { SocialIcon } from 'react-social-icons';

function Landing() {
    const IMAGES = {
        card1: [personalArchives, 'Personal Archives'],
        card2: [travelogues, 'Published Travelogues'], 
        card3: [tourOperators, 'Tour Operators'], 
        card4: [digitalExhibit, 'Digital Exhibit'], 
        card5: [about, 'About']
    };
    
    return (
        <div className='landing-page'>
            <div className='header'>
                <Banner/>
            </div>
            <div className='body'>
                <NavCards images={IMAGES}/>
            </div>
            <div className='footer'>
                <FooterLinks/>
            </div>
        </div>
    );
}

function Banner() {
    return (
        <div className='title-banner'>
            <div className='container'>
                <div className='title-box'>
                    <img src={ebaTitle} alt='Emma B. Andrews title'/>
                </div>
            </div>
            <div className='container'>
                <div className='image-box'>
                    <div className='header-box'>
                        <h1>Travelers In Egypt</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NavCards(props) {
    return (
        <div className='card-container'>
                <RenderCards images={props.images}/>
        </div>
    )
}

function RenderCards(props) {
    let cards = Object.values(props.images).map(([path, desc]) => {
        let card = 
            <div className='each-card'>
                <div className='top-card'>
                    <img src={path} alt={desc} />
                    <div className='bottom-card'>
                        <p>{desc}</p>
                    </div>
                </div> 
            </div>;
        return card;
    });

    return (
        <div className='card-row'>
            {cards}
        </div>
    );
}

function FooterLinks() {
    return (
        <div className='footer-links'>
            <div className='social-link-container'>
                <div className='icon-link'>
                    <SocialIcon url='https://www.facebook.com/ebadiary' bgColor='rgba(119, 101, 63, 0.8)'/>
                </div>
                <div className='icon-link'>
                    <SocialIcon url='https://github.com/orgs/eba-diary/dashboard' bgColor='rgba(119, 101, 63, 0.8)'/>
                </div>
                <div className='icon-link'>
                    <SocialIcon url='https://twitter.com/ebadiary?lang=en' bgColor='rgba(119, 101, 63, 0.8)'/>
                </div>
            </div>
            <div className='cc-info'>
                <div className='cc-image'>
                    <img id='cc' src={cc} alt='creative commons logo'/>
                </div>
                <div className='cc-link'>
                    <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>
                        Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Landing;