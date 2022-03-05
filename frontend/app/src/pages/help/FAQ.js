import React, {Component } from 'react';
import { CardTitle, CardBody, Row, Col, Card } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react'
import './css/FAQ.css';

 const options = [
        { key: 1, text: 'Category 1', value: 1 },
        { key: 2, text: 'Category 2', value: 2 },
        { key: 3, text: 'Category 3', value: 3 },
      ];

const updatePage = (value) => {
    options.forEach((key) => {
        let div = document.querySelector(".val_" + key.value + "_div");
        console.log("style: " + div.style.display);
        if (div.style.display !== "none") {
            div.style.display = "none";
        }
    });
    let curr = document.querySelector(".val_" + value + "_div");
    curr.style.display = "block";
}


class FAQHelper extends Component {
    state = {};
    handleChange = ((e, { value }) => {
        this.setState({ value });
        updatePage(value);
    });


    render() {
        const { value } = this.state;
        let test =
            <div>
                <div className="container">
                    <Row>
                        <Col>
                            <Card>
                                <CardTitle tag="h2" className="text-center">How can we help?</CardTitle>
                                <Dropdown
                                    onChange={this.handleChange}
                                    options={options}
                                    placeholder='Search a category'
                                    selection
                                    value={value}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <div className='val_1_div'>
                            <Card>
                                <CardTitle>Question 1</CardTitle>
                                <CardBody>This is some text within a card body.</CardBody>
                            </Card>
                        </div>
                    </Row>
                    <Row>
                        <div className='val_2_div'>
                            <Card>
                                <CardTitle>Question 2</CardTitle>
                                <CardBody>This is some text within a card body.</CardBody>
                            </Card>
                        </div>
                    </Row>
                    <Row>
                        <div className='val_3_div'>
                            <Card>
                                <CardTitle>Question 3</CardTitle>
                                <CardBody>This is some text within a card body.</CardBody>
                            </Card>
                        </div>
                    </Row>
                </div>
            </div>;

    return(test);
    }
}

function FAQ() {
    return (
        <div>
            <FAQHelper />
        </div>
    )

}
export default FAQ;