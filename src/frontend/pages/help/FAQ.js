import React, {Component } from 'react';
// import { CardTitle, CardBody, Row, Col, Card } from 'reactstrap';
import { Dropdown, Container, Header } from 'semantic-ui-react'
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
    console.log("value:" + value);
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
                <Container className="container">
                    <Header tag="h2" className="text-center">How can we help?</Header>
                    <Dropdown
                        onChange={this.handleChange}
                        options={options}
                        fluid
                        placeholder='Search a category'
                        selection
                        value={value}
                    />
                    <Container className='val_1_div'>
                            Question 1
                    </Container>
                    <Container className='val_2_div'>
                            Question 2
                    </Container>
                    <Container className='val_3_div'>
                        Question 3
                    </Container>
            </Container>;

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