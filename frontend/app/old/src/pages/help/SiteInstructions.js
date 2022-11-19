import React from 'react';
import { Col, Row, Card, CardTitle, CardText} from 'reactstrap';

function SiteInstructions() {
    return (
        <div>
            <div className="container">
                <Row>
                    <Col>
                        <Card body>
                            <CardTitle tag="h2" body="true" className="text-center">
                                Navigating the Content Readers
                            </CardTitle>
                            <CardText>
                                <p className='paragraphtext'>
                                    Click the bottom in the drop down.
                                </p>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="container">
                <Row>
                    <Col>
                        <Card body>
                            <CardTitle tag="h2" body="true" className="text-center">
                                How to find information relevant to specific research questions?
                            </CardTitle>
                            <CardText>
                                <p className='paragraphtext'>
                                What are some good questions to ask? Are there certain volumes, years, etc. that are more likely to contain certain information?
                                </p>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="container">
                <Row>
                    <Col>
                        <Card body>
                            <CardTitle tag="h2" body="true" className="text-center">
                                The Historical Mark-Up Tool
                            </CardTitle>
                            <CardText>
                                <p className='paragraphtext'>
                                What are its uses?<br />
                                What makes the information it produces unique?
                                </p>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
/* Instructions will model the wireframe

[Link will be posted]

Minimum requirements:

Title and overview summary of page purpose

Ordered List of Instructions

Drop down for each row

Each drop down will include the following

Further explanation of instructions */
export default SiteInstructions;