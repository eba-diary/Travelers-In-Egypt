import React, {Component } from 'react';
import { Dropdown, Container, Header } from 'semantic-ui-react'
import './css/FAQ.css';

 const options = [
        { key: 1, text: 'How do I use database content in personal ' +
                    'research, academic projects, teaching, etc.?', value: 1 },
        { key: 2, text: 'Content credits (archives)', value: 2 },
        { key: 3, text: 'What DH tools does the project use?', value: 3 },
        { key: 4, text: 'Bibliography of UW research done w/ EBA', value: 4},
        { key: 5, text: 'Future project plans?', value: 5},
        { key: 6, text: 'Info for students who have an idea/want to get ' +
                    'involved', value : 6},
        { key: 7, text: 'Examples of student research', value: 7},
        { key: 8, text: 'Basic historical context', value: 8}
      ];

const updatePage = (value) => {
    options.forEach((key) => {
        let question_div = document.querySelector(".val_" + key.value + "_div");
        console.log("style: " + question_div.style.display);
        if (question_div.style.display !== "none") {
            question_div.style.display = "none";
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
        let faq_div = document.querySelector(".faq-text");
        faq_div.style.display = "block";
        updatePage(value);
    });


    render() {
        const { value } = this.state;
        let test =
                <Container className="container">
                    <Header tag="h2" className="text-center help-header">How can we help?</Header>
                    <Dropdown className='dropdown'
                        onChange={this.handleChange}
                        options={options}
                        fluid
                        placeholder='Search a category'
                        selection
                        value={value}
                    />
                    <div className='faq-text'>
                        <Container className='val_1_div'>
                                Question 1
                        </Container>
                        <Container className='val_2_div'>
                                Question 2
                        </Container>
                        <Container className='val_3_div'>
                                Question 3
                        </Container>
                        <Container className='val_4_div'>
                                Question 4
                        </Container>
                        <Container className='val_5_div'>
                                Question 5
                        </Container>
                        <Container className='val_6_div'>
                                Question 6
                        </Container>
                        <Container className='val_7_div'>
                                Question 7
                        </Container>
                        <Container className='val_8_div'>
                                Question 8
                        </Container>
                    </div>
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