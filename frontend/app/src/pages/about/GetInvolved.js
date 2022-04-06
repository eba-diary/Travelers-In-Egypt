import React from 'react';
import donationBackdrop from '../../img/UndrawDonation.svg';
import "./css/GetInvolved.css"
import { Button, CardImgOverlay, CardSubtitle, Col, Card, CardImg, CardTitle } from 'reactstrap';

function GetInvolved() {
    let pageContent = 
        <div className="row justify-content-left">
            <div className="col-6">
                Our ongoing work relies on the generosity of our supporters. 
                If you are interested in making a donation, 
                you can do so <a href="https://nelc.washington.edu/nelc-digital-support-our-work">here</a>.
                Your investment in our work goes a long way! Thank you.
            </div>
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
                        alt="donation image"
                        src={donationBackdrop}
                    />
                    <CardImgOverlay>
                        <CardTitle style={{color: "black", fontWeight: "750"}}>
                            Get Involved with the Department of
                            Near Eastern Languages and Civilizations
                            <CardSubtitle>
                                Supporting Text
                            </CardSubtitle>
                        </CardTitle>
                    <Button>
                        <a href="https://nelc.washington.edu/nelc-digital-support-our-work"
                           className="get-involved-button"
                        >
                            Donate Now
                        </a>
                    </Button>
                    </CardImgOverlay>
                </Card>
            </Col>
        </div>
    );
}


export default GetInvolved;