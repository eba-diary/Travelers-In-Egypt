import React, { Component } from 'react';
import { Dropdown, Container, Header, Accordion, Icon } from 'semantic-ui-react'
import './css/FAQ.css';

const options = [
    { key: 1, text: 'Frequently asked questions', value: 1 },
    {
        key: 2, text: 'How do I use database content in personal ' +
            'research, academic projects, teaching, etc.?', value: 2
    },
    { key: 3, text: 'Content credits (archives)', value: 3 },
    { key: 4, text: 'What DH tools does the project use?', value: 4 },
    { key: 5, text: 'Bibliography of UW research done w/ EBA', value: 5 },
    { key: 6, text: 'Future project plans?', value: 6 },
    {
        key: 7, text: 'Info for students who have an idea/want to get ' +
            'involved', value: 7
    },
    { key: 8, text: 'Examples of student research', value: 8 },
    { key: 9, text: 'Basic historical context', value: 9 }
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
    state = { questionNum: 0, activeIndex: -1 };
    handleChange = ((e, { value }) => {
        this.setState({ questionNum: value });
        let faq_div = document.querySelector(".faq-text");
        faq_div.style.display = "block";
        updatePage(value);
    });

    handleClick = ((e, titleProps) => {
        console.log("clicked");
        const { index } = titleProps;
        console.log("index: " + index);
        const activeIndex = this.state.activeIndex;
        console.log("activeIndex: " + activeIndex);
        const newIndex = activeIndex === index ? -1 : index
        console.log("newIndex: " + newIndex);
        this.setState({ activeIndex: newIndex })
    });

    render() {
        const { value } = this.state.questionNum;
        const activeIndex = this.state.activeIndex;
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
                        <Accordion fluid styled>
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={this.handleClick}
                            >
                                <Icon name='dropdown' />
                                Common Question 1
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </Accordion.Content>

                            <Accordion.Title
                                active={activeIndex === 1}
                                index={1}
                                onClick={this.handleClick}
                            >
                                <Icon name='dropdown' />
                                Common Question 2
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </Accordion.Content>

                            <Accordion.Title
                                active={activeIndex === 2}
                                index={2}
                                onClick={this.handleClick}
                            >
                                <Icon name='dropdown' />
                                Common Question 3
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 2}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </Accordion.Content>
                        </Accordion>
                    </Container>
                    <Container className='val_2_div'>
                        Question 1
                    </Container>
                    <Container className='val_3_div'>
                        Question 2
                    </Container>
                    <Container className='val_4_div'>
                        Question 3
                    </Container>
                    <Container className='val_5_div'>
                        Question 4
                    </Container>
                    <Container className='val_6_div'>
                        Question 5
                    </Container>
                    <Container className='val_7_div'>
                        Question 6
                    </Container>
                    <Container className='val_8_div'>
                        Question 7
                    </Container>
                    <Container className='val_9_div'>
                        Question 8
                    </Container>
                </div>
            </Container>;

        return (test);
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