import React, { useEffect, useState } from 'react';
import './css/Landing.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import placeholder from '../img/placeholder.png';
import background from '../img/eba_bg.png';
import Markdown from 'markdown-to-jsx';
import aboutMarkdown from './md/About.md';
import { CardImg, Col, Row, Card, CardTitle, CardText, CardBody, CardSubtitle, Button } from 'reactstrap';


function Landing() {

    let img = document.createElement('img');
    img.src = background;
    img.alt = 'historical Egyptian site';

    // This element is for mobile demo and will be changed later.
    let mobile = document.createElement('p');
    let textNode = document.createTextNode('mobile test');
    mobile.appendChild(textNode);

    // Changes elements depending on screen size.
    const handleResize = () => {
        let length = window.innerWidth;
        let row = document.getElementById('row');
        row.innerHTML = '';
        length >= 458 ? row.appendChild(img) : row.appendChild(mobile);
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
                                src={placeholder}
                                width='50%'
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="container our-goals">
                <div className="row">
                    <div className="col">
                        <h2 className='text-center'>Our Goals</h2>
                    </div>
                </div>
                <Row>
                    <Col sm='4'>
                        <Card body>
                            <CardTitle>
                                <h3>Preserve</h3>
                            </CardTitle>
                            <CardText>
                                To preserve and make freely available lesser known or 
                                understudied literary and historical texts from the Near 
                                East.
                            </CardText>
                        </Card>
                    </Col>
                    <Col sm='4'>
                        <Card body>
                            <CardTitle>
                                <h3>Research</h3>
                            </CardTitle>
                            <CardText>
                                To develop a new hybrid model of rigorous training in the core 
                                skills associated with historical and literary research, coupled
                                with essential competencies in computer literacy.
                            </CardText>
                        </Card>
                    </Col>
                    <Col sm='4'>
                        <Card body>
                            <CardTitle>
                                <h3>Develop</h3>
                            </CardTitle>
                            <CardText>
                                To further the advancement of digital humanities as a field in order 
                                to foster much needed technical skills in graduate and undergraduate 
                                humanities students.
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="container card-3">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                            <CardTitle tag="h5">
                                Purpose
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                More text
                            </CardSubtitle>
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
                            <Button>
                                View Team
                            </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Landing;