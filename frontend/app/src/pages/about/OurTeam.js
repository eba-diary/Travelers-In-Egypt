import React from 'react';
import OurTeamJson from './OurTeam.json'
import './css/OurTeam.css';

import { Col, Row, Card, CardTitle, CardText, CardBody, CardSubtitle, Button, UncontrolledCollapse } from 'reactstrap';

function OurTeam() {
    return (
        <div>
            <div className="container">
                <Row>
                    <Col>
                        <Card body>
                            <CardTitle tag="h2" body="true" className="text-center">
                                Our Team
                            </CardTitle>
                            <CardText>
                                <p className='team-paragraph'>
                                    Undergraduate student interns have played an
                                    integral role in the process of transcription,
                                    encoding, historical research and data
                                    visualization, leading to the establishment of <a href="http://www.newbookdigitaltexts.org/">
                                        Newbook Digital Texts
                                    </a>,
                                    an online publishing house offering a flourishing
                                    student internship program in digital humanities.
                                    Graduate students have completed capstone projects
                                    on various aspects of this project, including web design,
                                    metadata, mapping and visualization, and the development
                                    of text markup and analysis tools. All contributors
                                    and supporters are <a href="http://www.emmabandrews.org/project/about">
                                        credited here
                                    </a>.
                                </p>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="container">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag='h2' body="true" className="text-center">
                                    Project Director
                                </CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h5">
                                    Sarah L. Ketchley, Ph.D : Emma B. Andrews Project Director/Newbook Digital Texts Co-Director
                                </CardSubtitle>
                                <CardText>
                                    <p className='director-paragraph'>
                                        Sarah is an Affiliate Instructor in Near Eastern Languages and Civilization at the University of Washington, an Adjunct Associate Professor at University of Maryland University College, and a Digital Humanities Specialist at Gale. She trained as an Egyptologist, specializing in art history in the first millennium. She has taught courses Egyptian history and archeology at the University of Birmingham, UK, and <a href="http://www.newbookdigitaltexts.org/education/">teaches digital humanities</a> at the University of Washington.
                                    </p>
                                    <p className="director-paragraph">
                                        <a href="https://twitter.com/SarahKetchley">
                                            @sarahketchley
                                        </a> ketchley@uw.edu
                                    </p>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="text-center">
                            Student Contributors
                        </h2>
                    </div>
                </div>
                <div>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h4">
                                        Overview
                                    </CardTitle>
                                    <CardText>
                                        Each year we have been fortunate to have a dedicated group of student interns working with us, who are valued and equal partners in our research endeavors. The scope of the tasks they have worked on includes transcribing, editing, conducting historical research and managing technical aspects of the project.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <div>
                <StudentContributors/>
            </div>
            <div className="container">
                <Row >
                    <Col>
                        <Card body>
                            <CardTitle tag='h2' body="true" className="text-center">
                                Funding and Support
                            </CardTitle>
                            <CardText>
                                <p className='funding-paragraph'>
                                Our projects, faculty and students have received funding awards and stipends from the following organizations for project expenses, training and travel:</p>
                                <p><a href="https://www.neh.gov/">The National Endowment for the Humanities</a></p>
                                <p><a href="https://simpsoncenter.org/">The Simpson Center for the Humanities</a></p>
                                <p><a href="http://dhsi.org/">Digital Humanities Summer Institute</a></p>
                                <p><a href="https://www.computecanada.ca/">Compute Canada</a></p>
                                <p><a href="https://www.amphilsoc.org/">The American Philosophical Society</a></p>
                                <p><a href="http://www.washington.edu/undergradresearch/students/funding/">University of Washington Undergraduate Research Program</a></p>
                                <p><a href="http://expd.uw.edu/mge/apply/research/">Mary Gates Research Scholarships</a></p>
                                <p><a href="http://depts.washington.edu/uwmcnair/">University of Washington McNair Program</a></p>
                                <p>Thanks also to individual UW Departments who have given several departmental awards to our interns.</p>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function StudentContributors() {
    let toggler = "toggler";
    let togglerIndex = -1;
    let studentCards = OurTeamJson.map((eachCard) => {
        let eachAnnualCard = Object.keys(eachCard).map((details) => {
            let eachDetail = <p>{eachCard[details]}</p>
            return(eachDetail);
                
        });
        togglerIndex++;
        return(
            <div className="col-4">
                <Card body> 
                    <div>
                        <Button
                                color="primary" outline
                                id={toggler + togglerIndex}
                                style={{
                                marginBottom: '1rem'
                                }}
                            >
                                {eachCard.year}
                            </Button>
                            <UncontrolledCollapse toggler={toggler + togglerIndex}>
                                <Card>
                                    <CardBody>
                                        {eachAnnualCard}
                                    </CardBody>
                                </Card>
                            </UncontrolledCollapse>
                    </div>
                </Card>
            </div>
        );
    });
    return(
        <div className="container">
            <div className="row">
                {studentCards}
            </div>
        </div>
    );
}

export default OurTeam;