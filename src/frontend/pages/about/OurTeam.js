import React from 'react';
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
                                    visualization, leading to the establishment of 
                                    <a href="http://www.newbookdigitaltexts.org/">
                                        Newbook Digital Texts 
                                    </a>, 
                                    an online publishing house offering a flourishing
                                    student internship program in digital humanities. 
                                    Graduate students have completed capstone projects 
                                    on various aspects of this project, including web design, 
                                    metadata, mapping and visualization, and the development 
                                    of text markup and analysis tools. All contributors 
                                    and supporters are 
                                    <a href="http://www.emmabandrews.org/project/about">
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
            <div className="container student-team">
                <div className="row">
                    <div className="col">
                        <h2 className='text-center'>
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
                    <Row>
                        <Col sm='4'>
                            <Card body>
                                <div>
                                    <Button
                                        color="primary" outline
                                        id="toggler1"
                                        style={{
                                        marginBottom: '1rem'
                                        }}
                                    >
                                        2020-2021
                                    </Button>
                                    <UncontrolledCollapse toggler="#toggler1">
                                        <Card>
                                            <CardBody>
                                                <p><b>Reader development &amp; tagging management</b>: Emma Fritzberg</p>
                                                <p><b>Tagging</b>: Selma El-Badawi, Marshall Bender, Molly Taylor, Marianne Bautista, Hannah Burrows, Izzy Wiebe, Isabelle Schlegel, Thurston Duong, Olivia Hyre, Dhreeti Rathore, Benjamin Lewis</p>
                                                <p><b>Biographies</b>: Jasmine Jones, Jasmine Choi, Samuel Roller, Iona Hillman, Avneet Dhaliwal, Anton Reicherter, Priya Hariharan, Avery Dahl</p>
                                                <p><b>Social Media</b>: Priya Hariharan, Gabrielle Wilson</p>
                                                <p><b>Travelers in Egypt travelogues</b>: Frederick Chan</p>
                                                <p><b>Thomas Cook &amp; Son Passenger Cards</b>: Yanni Zhou</p>
                                                <p><b>Web development</b>: Margaret Hsaio, Patrick Liu</p>
                                                <p><b>Helen Winlock proofreading &amp; editing</b>: Laura Van Arsdel</p>
                                            </CardBody>
                                        </Card>
                                    </UncontrolledCollapse>
                                </div>
                            </Card>
                        </Col>
                        <Col sm='4'>
                            <Card body>
                                <div>
                                    <Button
                                        color="primary" outline
                                        id="toggler2"
                                        style={{
                                        marginBottom: '1rem'
                                        }}
                                    >
                                        2019-2020
                                    </Button>
                                    <UncontrolledCollapse toggler="#toggler2">
                                        <Card>
                                            <CardBody>
                                                <p><b>Marketing/Social Media</b>: Jasmine Jones, Padma Gundapaneni, Bingyan Wang, Xiru Jian, Shannon Chung, Claire Gui, Ye Ram Lee, Amanda Fung. Thanks to Gabrielle Wilson for leading this group.
                                                </p>
                                                <p><b>Helen Winlock transcriptions</b>: Calvin Scott Paulson</p>
                                            </CardBody>
                                        </Card>
                                    </UncontrolledCollapse>
                                </div>
                            </Card>
                        </Col>
                        <Col sm='4'>
                            <Card body>
                                <div>
                                    <Button
                                        color="primary" outline
                                        id="toggler3"
                                        style={{
                                        marginBottom: '1rem'
                                        }}
                                    >
                                        2018-2019
                                    </Button>
                                    <UncontrolledCollapse toggler="#toggler3">
                                        <Card>
                                            <CardBody>
                                                <p>Connor Raftery, Aly Brady, Kanishka Reddy, Calvin Scott Paulson, Rebecca Vance, David Darnall, Steve Thatcher</p>
                                                <p><b>MLIS Capstone</b>: Riko Fluchel (metadata), Erika Bailey (website)</p>
                                                <p><b>CSE 512 Data Visualization Capstone</b>: Hannah Twigg-Smith, Benjamin Ferleger, Katina Papadakis, Yu-Tang Peng</p>
                                                <p><b>Historical Markup Tool</b>: Audrey Holmes</p>
                                                <p><b>Theodore Davis's Will &amp; Database</b>: Rebecca Vance</p>
                                            </CardBody>
                                        </Card>
                                    </UncontrolledCollapse>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            <div className="container student-team">
                <Row>
                    <Col sm='4'>
                        <Card body>
                                <div>
                                    <Button
                                        color="primary" outline
                                        id="toggler4"
                                        style={{
                                        marginBottom: '1rem'
                                        }}
                                    >
                                        2017-2018
                                    </Button>
                                    <UncontrolledCollapse toggler="#toggler4">
                                        <Card>
                                            <CardBody>
                                                <p>Rebecca Vance, Sesha Machiraju, Vanessa Lin, Connor Raftery, Aly Brady</p>
                                            </CardBody>
                                        </Card>
                                    </UncontrolledCollapse>
                                </div>
                        </Card>
                    </Col>
                    <Col sm='4'>
                        <Card body>
                            <div>
                                <Button
                                    color="primary" outline
                                    id="toggler5"
                                    style={{
                                    marginBottom: '1rem'
                                    }}
                                >
                                    2016-2017
                                </Button>
                                <UncontrolledCollapse toggler="#toggler5">
                                    <Card>
                                        <CardBody>
                                            <p>Rebecca Vance, Janice Garr</p>
                                        </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                            </div>
                        </Card>
                    </Col>
                    <Col sm='4'>
                        <Card body>
                            <div>
                                <Button
                                    color="primary" outline
                                    id="toggler6"
                                    style={{
                                    marginBottom: '1rem'
                                    }}
                                >
                                    2015-2016
                                </Button>
                                <UncontrolledCollapse toggler="#toggler6">
                                    <Card>
                                    <CardBody>
                                    <p>Jiafei Li, Chelsea Cooper, Janice Garr, Nitya Sampath, Jennifer Charoni, Karena Vongampai, Christina Seang, Claire Summa, Shirley Chen. IT Support: Brad Holland, Chris Sumption</p>
                                    </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="container student-team">
                <Row>
                    <Col sm='4'>
                        <Card body>
                            <div>
                                <Button
                                    color="primary" outline
                                    id="toggler7"
                                    style={{
                                    marginBottom: '1rem'
                                    }}
                                >
                                    2014-2015
                                </Button>
                                <UncontrolledCollapse toggler="#toggler7">
                                    <Card>
                                        <CardBody>
                                            <p>Allison Skinner, Sarah Johnson, Chelsea Cooper, Georgia Gilbert, Janice Garr, Chris Sumption, Gabby Wilson.</p>
                                        </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                            </div>
                        </Card>
                    </Col>
                    <Col sm='4'>
                        <Card body>
                            <div>
                                <Button
                                    color="primary" outline
                                    id="toggler8"
                                    style={{
                                    marginBottom: '1rem'
                                    }}
                                >
                                    2013-2014
                                </Button>
                                <UncontrolledCollapse toggler="#toggler8">
                                    <Card>
                                        <CardBody>
                                            <p>Megan Rowland (Project Manager), Janice Garr, Chelsea Cooper, Allison Skinner, Sarah Faigin, Ema Grey, Tessa Carter, Sarah Johnson, Gabby Wilson.</p>
                                        </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                            </div>
                        </Card>
                    </Col>
                    <Col sm='4'>
                        <Card body>
                            <div>
                                <Button
                                    color="primary" outline
                                    id="toggler9"
                                    style={{
                                    marginBottom: '1rem'
                                    }}
                                >
                                    2012-2013
                                </Button>
                                <UncontrolledCollapse toggler="#toggler9">
                                    <Card>
                                        <CardBody>
                                            <p>Megan Rowland, Tessa Carter, Janice Garr, Ariella Fish, Rachel Schlotfeldt.</p>
                                        </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                            </div>
                        </Card>
                    </Col>
                </Row>
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

export default OurTeam;