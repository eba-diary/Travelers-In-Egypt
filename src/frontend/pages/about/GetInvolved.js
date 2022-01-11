import React from 'react';
import donationBackdrop from '../../img/imagePlaceholderRect.png';
import { Button, CardImgOverlay, CardSubtitle, Col, Card, CardImg, CardTitle } from 'reactstrap';

function GetInvolved() {
    let pageContent = 
        <div className="row justify-content-center">
            Our ongoing work relies on the generosity of our supporters. 
            If you are interested in making a donation, 
            <a href="https://nelc.washington.edu/nelc-digital-support-our-work">you can do so here</a>. 
            Your investment in our work goes a long way! Thank you.
        </div>;

    return(
        <div className="container">
            <DonationBackdrop />
            {pageContent}
        </div>
    );
}

function DonationBackdrop() {
    return (
        <div className="row">
            <Col>
                <Card inverse>
                    <CardImg
                        alt="donation image placeholder"
                        src={donationBackdrop}
                    />
                    <CardImgOverlay>
                        <CardTitle>

                            Get Invovled with the Department of
                            Near Eastern Languages and Civilizations
                            <CardSubtitle>
                                Supporting Text
                            </CardSubtitle>
                        </CardTitle>
                    <Button>Donate Now</Button>
                    </CardImgOverlay>
                </Card>
            </Col>
        </div>
    );
}


export default GetInvolved;