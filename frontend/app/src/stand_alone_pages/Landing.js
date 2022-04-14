import React from 'react';
import './css/Landing.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import aboutImage from '../img/aboutImage.jpeg';
import goalCard1 from '../img/goalCard1.png';
import goalCard2 from '../img/goalCard2.png';
import goalCard3 from '../img/goalCard3.jpg';
import arrows from '../img/goal_arrow_down.png';
import background from '../img/eba_bg.png';
import { CardImg, Col, Row, Card, CardTitle, CardText, CardBody, Button } from 'reactstrap';
import projGoalsJSON from './ProjGoals.json';


function Landing() {

    let img = document.createElement('img');
    img.src = background;
    img.alt = 'historical Egyptian site';

    // This element is for mobile demo and will be changed later.
    let mobile = document.createElement('p');
    let textNode = document.createTextNode('Travelers In Egypt');
    mobile.appendChild(textNode);   


    // Changes elements depending on screen size.
    const handleResize = () => {
        let length = window.innerWidth;
        let row = document.getElementById('row');
        if (row) {
            row.innerHTML = "";
            length >= 458 ? row.appendChild(img) : row.appendChild(mobile);
        }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return (
        <div>
            <div className='row' id='row'>
                <img src={background} alt={img.alt}/>
            </div>
            <div className='container'>
                <Row className='about-row'>
                    <Col sm='12' lg='6'>
                        <Card body style={{border: 'none'}}>
                            <CardTitle tag='h2'>
                                About
                            </CardTitle>
                            <CardText>
                                <p className='about-paragraph'>
                                    The Emma B. Andrews Diary Project began in 2011 at the University of Washington, 
                                    a product of <em className='bold'>Dr. Sarah Ketchley's work to transcribe and analyze a multi-volume 
                                    collection of Nile travel journals written by Mrs. Emma B. Andrews</em>, who is best 
                                    remembered for her association with the millionaire lawyer turned archaeologist/art 
                                    and antiquities collector, Theodore M. Davis. Traveling to Egypt with him 
                                    between 1889 and 1912, she kept detailed journals of these voyages along the Nile, 
                                    including his important yet under-reported excavations of more than 20 significant 
                                    tombs in the Valley of the Kings.
                                </p>
                            </CardText>
                        </Card>
                    </Col>
                    <Col sm='12' lg='6'>
                        <Card inverse style={{border: 'none'}}>
                            <CardTitle></CardTitle>
                            <CardText></CardText>
                            <CardImg 
                                alt='placeholder'
                                src={aboutImage}
                                
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <div>
                <GoalCards />
            </div>
            <div className="container card-3">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                            <CardTitle tag="h5">
                                Purpose
                            </CardTitle>
                            <CardText>
                                The scope of our archival material has expanded beyond the 
                                Andrews Diaries to include diaries and letters written by 
                                some of the lesser-known figures in Egyptology, including the 
                                unpublished writings of some of the 'hidden' women of early 
                                Egyptology - the wives of archaeologists. These women had 
                                prominent roles in archaeological circles, yet they are mostly 
                                forgotten since their records were personal letters and diaries, 
                                now dispersed in little-known family or institutional archives. 
                                The life writings of these women add important and unique 
                                historiographical context to the social and archaeological 
                                history of the time, and provide a unique and detailed overview 
                                of discipline formation, gendered labor, and social and 
                                intellectual networks in Egypt during this period.
                            </CardText>
                            <Button 
                                style={{
                                    backgroundColor: "#DED7B9",
                                }}
                                onClick={() =>  window.location.href="/OurTeam"}
                            >
                                <div className="view-team-button">
                                    View Team
                                </div>
                            </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function GoalCards() {
    const imgArr = [goalCard1, goalCard2, goalCard3];
    let index = 0;
    
    let cards = projGoalsJSON.map((content) => {
        let goalCard = 
            <Col sm='12' md='6' lg='4'>
                <Card body style={{border: "none"}}>
                    <CardBody>
                        <CardImg alt="canva design" src={imgArr[index]} top width="100%"/>
                        <div className="dark-title-button" id={content.id} key={content.id} onClick={() => { 
                            let currentGoalBox = document.getElementById(content.id);
                            let coressArrow = document.getElementById(content.children);
                            if (currentGoalBox) {
                                currentGoalBox.classList.toggle("dark-title-button-open");
                            }
                            if (coressArrow) {
                                coressArrow.classList.toggle("rotated");
                            }
                        }}>
                            <h3 className="goal-title-text">
                                {content.title}
                            </h3>
                            <p className="goal-card-text">
                               {content.text}
                            </p>
                            <img 
                                src={arrows} 
                                alt="arrow dropdown indicator" 
                                className="arrow-white" 
                                id={content.children}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Col>;
            index++;
        return goalCard;
    });


    return (
        <div className="container our-goals">
            <div className="row">
                <div className="col">
                    <h2 className='text-center'>Our Goals</h2>
                </div>
            </div>
            <div className="row justify-content-center">
                {cards}
            </div>
        </div>
    );
}

export default Landing;