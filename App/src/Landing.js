import React from 'react';
import './Landing.css';
import ebaTitle from './img/EBA_title_img.jpeg';
import personalArchives from './img/personalArchives.png';
import travelogues from './img/Travelogues.png';
import tourOperators from './img/TourOperators.png';
import digitalExhibit from './img/DigitalExhibit.png';
import about from './img/About.png';

function Landing() {
    const IMAGES = {
        card1: [personalArchives, 'Personal Archives'],
        card2: [travelogues, 'Published Travelogues'], 
        card3: [tourOperators, 'Tour Operators'], 
        card4: [digitalExhibit, 'Digital Exhibit'], 
        card5: [about, 'About']
    };
    
    return (
        <div className='body'>
            <Banner/>
            <NavCards images={IMAGES}/>
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

export default Landing;