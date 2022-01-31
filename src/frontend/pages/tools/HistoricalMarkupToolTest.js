import React from 'react';
import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: '/HistoricalMarkupTool'
// })

const MarkupToolInstructions = () => {
    return (
        <div className="container">
            <div className="alert alert-info">
                <h3>How it works</h3>
                <p>Paste your plain text into the box below. Click submit when you are ready. This may take a few minutes, especially if you are submitting a long text.</p>
                <p>Once your markup is ready, you will be able to make any edits and download the output.</p>
            </div>
        </div>
    )
}

class HistoricalMarkupToolForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.props.handleSubmit.bind(this);
    }

    clearForm()  {
        return
    }
    
    render() {
        return (
            <div>
                <div className="container">
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
                            <label className="col-sm-2">Your Text <font color="red">* </font></label>
                            <div className="col-sm-10">
                                <textarea type="text" rows="5" cols="5" className="form-control"  name="rawText" required={true}></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="reset" className="btn btn-primary"> Clear</button>
                                <button type="submit" className="btn btn-info" onClick={() => window.location.href + "/output"}>Submit</button>
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
    }

    render() {
        return (
            <div>
                <textarea name="" id="" cols="30" rows="10">
                    {this.data}
                </textarea>
            </div>
        )
    }
}

class HistoricalMarkupToolTest extends React.Component {
    state = {
        xmlData: "",
        displayXmlData: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("clicked button")
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
                <MarkupToolInstructions />
                <HistoricalMarkupToolForm handleSubmit={this.handleSubmit}/>
                { this.state.displayXmlData && <XmlOutputEditor data={this.state.xmlData}/>}
            </div>
        )
    }
}

export default HistoricalMarkupToolTest;