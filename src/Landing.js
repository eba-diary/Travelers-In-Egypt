import React from 'react';
import './Landing.css';
import personalArchives from './img/personalArchives.png';
import travelogues from './img/Travelogues.png';
import tourOperators from './img/TourOperators.png';
import digitalExhibit from './img/DigitalExhibit.png';
import about from './img/About.png';
import { Link, Route, Redirect } from 'react-router-dom';
import PersonalArchives from './PersonalArchives';
import Travelogues from './Travelogues';
import TourOperators from './TourOperators';
import DigitalExhibit from './DigitalExhibit';
import About from './About';
import { Container, Row, Col, Card} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import backgroundTitleImage from './img/banner_img_landing.jpeg';

function Landing() {
    const IMAGES = {
        card1: [personalArchives, 'Personal Archives', 'PersonalArchives', PersonalArchives],
        card2: [travelogues, 'Published Travelogues', 'Travelogues', Travelogues], 
        card3: [tourOperators, 'Tour Operators', 'TourOperators', TourOperators], 
        card4: [digitalExhibit, 'Digital Exhibit', 'DigitalExhibit', DigitalExhibit], 
        card5: [about, 'About', 'About', About]
    };
    
    return (
        <div>
            <Card className='text-white text-center'>
                <Card.Img src={backgroundTitleImage} alt='Egyptian ruins'/>
                <Card.ImgOverlay>
                        <h1>Travelers In Egypt</h1>
                </Card.ImgOverlay>
            </Card>
            <div className='landing-page'>
                <div className='nav-cards'>
                    <NavCards images={IMAGES}/>
                </div>
            </div>
        </div>
    );
}


function NavCards(props) {
    return (
        <div>
            <RenderCards images={props.images}/>
            <Redirect to='/'/>
        </div>
    );
}

function RenderCards(props) {
    let cards = Object.values(props.images).map(([img, desc, path, component]) => {
        let card = 
            <div className='col col-md-4 col-xl-3 each-card'>
                <Link to={'/' + path}>
                    <div className='top-card'>
                        <img src={img} alt={desc} />
                        <div className='bottom-card'>
                            <p>{desc}</p>
                        </div>
                    </div>
                </Link>
                <Route path={'/' + path} component={component}/> 
            </div>;
        return card;
    });

    return (
        <div className='container'>
            <div className='row justify-content-md-center'>
                {cards}
            </div>
        </div>
    );
}

export default Landing;