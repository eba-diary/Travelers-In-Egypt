import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Hmt.css';
import { Button, Collapse } from 'reactstrap';

const MarkupToolInstructions = () => {

    const [isOpen, setIsOpen] = useState(true);

    const onEntered = () => {
        let state = document.querySelector(".instruction-state");
        if (state) {
            state.innerHTML = "";
            state.innerHTML = "Close";
        }
    }

    const onExit = () => {
        let state = document.querySelector(".instruction-state");
        if (state) {
            state.innerHTML = "";
            state.innerHTML = "Open";
        }
    }

    return (
        <div className="container markup-tool-instructions">
            <div className="row instruction-text">
                <h3>How it works</h3>
                <Collapse
                    isOpen={isOpen}
                    onEntered={onEntered}
                    onExit={onExit}
                >
                    <p>Once your markup is ready, you will be able to make any edits and download the output.</p>
                    <p>Paste your plain text into the box below. Click submit when you are ready. This may take a few minutes, especially if you are submitting a long text.</p>
                </Collapse>
                <Button
                    onClick={ () => setIsOpen(!isOpen)}
                    style={{
                    marginBottom: '-35px'
                    }}
                >
                    <div className="instruction-state">
                        Close
                    </div>
                </Button>
            </div>
        </div>
    )
}

class HistoricalMarkupToolForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.props.handleSubmit.bind(this);
    }
    
    render() {
        return (
            <div>
                <MarkupToolInstructions />
                <div className="container">
                    <div className="row justify-content-center markup-tool-title">
                        Historical Markup Tool
                    </div>
                    <form action='/HistoricalMarkupTool/output' onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label className="col-sm-2">Title</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control form-control-sm" name="teiHeaderTitle"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2">Author</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control form-control-sm" name="teiHeaderAuthor"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2">Editor</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control form-control-sm" name="teiHeaderEditor"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2">Publisher</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control form-control-sm" name="teiHeaderPublisher"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2">Publisher Address</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control form-control-sm" name="teiHeaderPublisherAddress"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2">Publication Date</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control form-control-sm" name="teiHeaderPublicationDate"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2">License <span className="badge badge-info">New</span></label>
                            <div className="col-sm-6">
                                <select type="text" className="form-control form-control-sm" name="teiHeaderLicense">
                                <option value="CC_Attr_NonComm">Creative Commons Attribution-NonCommercial 4.0 International</option>
                                <option value="CC_Attr">Creative Commons Attribution 4.0 International</option>
                                <option value="CC_Attr_ShareAlike">Creative Commons Attribution-ShareAlike 4.0 International</option>
                                <option value="CC_Attr_NonComm_ShareAlike">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2">Source Description <span className="badge badge-info">New</span></label>
                            <div className="col-sm-10">
                                <textarea type="text" rows="2" cols="5" className="form-control"  name="teiHeaderSourceDescription"></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2">Project Description <span className="badge badge-info">New</span></label>
                            <div className="col-sm-10">
                                <textarea type="text" rows="2" cols="5" className="form-control"  name="teiHeaderProjectDescription"></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2">Your Text <span className="required-field">(required)</span></label>
                            <div className="col-sm-10">
                                <textarea type="text" rows="5" cols="5" className="form-control"  name="rawText" required={true}></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="reset" className="clear-form-button"> Clear</button>
                                <button type="submit" className="submit-form-button">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

class XmlOutputEditor extends React.Component {
    data = "";

    constructor(props) {
        super(props);
        this.data = props.data;
        this.handleFormReload = this.props.handleFormReload.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className='container'>
                <p className="markup-output-title">
                    <em className='success'>Success!</em> Make any edits below and click download when you are satisfied with the output
                </p>
                <textarea classname="xml-output" name="output" id="output" cols="100" rows="20">
                    {this.data}
                </textarea>
                <div className="button-controls">
                    <div className="back-button">
                        <Link to='/HistoricalMarkupTool' >
                            <button onClick={this.handleFormReload}>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

class HistoricalMarkupToolComponents extends React.Component {
    // TODO
    // add "New Markup" button
    // onClick = clear form and local storage

    state = {
        xmlData: "",
        displayXmlData: false
    }

    handleFormReload = () => {
        this.setState({
            xmlData: "",
            displayXmlData: false
        });
    }

    persistDataBetweenReload = () => {
        // TODO:
        // radio check button
        // defualt is checked
        // buttonCheck stored in state
        // checked = true, unchecked = false
        // add to local storage on input change
        // if true, use local storage to put data
        //  into input placeholders
        // else
        //  clear local storage
        return;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const getFormValueFromName = (nameField) => {
            let value = document.getElementsByName(nameField)[0].value;
            return value;
        }

        let title = getFormValueFromName('teiHeaderTitle');
        let author = getFormValueFromName('teiHeaderAuthor');
        let editor = getFormValueFromName('teiHeaderEditor');
        let publisher = getFormValueFromName('teiHeaderPublisher');
        let pAddress = getFormValueFromName('teiHeaderPublisherAddress');
        let date = getFormValueFromName('teiHeaderPublicationDate');
        let license = getFormValueFromName('teiHeaderLicense');
        let srcDesc = getFormValueFromName('teiHeaderSourceDescription');
        let projDesc = getFormValueFromName('teiHeaderProjectDescription');
        let text = getFormValueFromName('rawText');
        
        let dataJson = {
            teiHeaderTitle: title,
            teiHeaderAuthor: author,
            teiHeaderEditor: editor,
            teiHeaderPublisher: publisher,
            teiHeaderPublisherAddress: pAddress,
            teiHeaderPublicationDate: date,
            teiHeaderLicense: license,
            teiHeaderSourceDescription: srcDesc,
            teiHeaderProjectDescription: projDesc,
            rawText: text
        }

        if (text) {
            axios.post("/HistoricalMarkupTool/output", dataJson)
            .then((res) => {
                this.setState({xmlData: res.data, displayXmlData: true});
                console.log("state: " + this.state);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <div>
                { !this.state.displayXmlData &&
                    <HistoricalMarkupToolForm handleSubmit={this.handleSubmit}/>
                }
                { this.state.displayXmlData && 
                    <XmlOutputEditor data={this.state.xmlData} handleFormReload={this.handleFormReload}/>
                }
            </div>
        )
    }
}

export default HistoricalMarkupToolComponents;