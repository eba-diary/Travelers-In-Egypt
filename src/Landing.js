import React from 'react';
import { Card } from 'react-bootstrap';
import pyramidBackground from './img/EbaCartoonPyramid.png' ;
import './css/Landing.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Landing() {
    return (
    <div className='container'>
        <div className='row'>
            <Card className='text-dark text-center' border='white'>
                <Card.Title>
                    <div className='title-container'>
                        Travelers In Egypt
                    </div>
                </Card.Title>
                <Card.Img variant='' src={pyramidBackground} alt='Egyptian pyramids'/>
            </Card>
        </div>
    </div>
    );
}

export default Landing;