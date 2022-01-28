import React from 'react';

function FAQ() {
    let test = 
        <div className="container">
            Our FAQ page is under construction!
        </div>;

    return(test);
}

function HelpBar() {
    // TODO
    // get all questions of dropdown item type

    return (
        <div className="row justify-content-center">
            <div className="col-12">
                <h1>How Can We Help?</h1>
            </div>
            <div className="col-12">
                <form action="/FAQ"> {/*get method*/}
                    <label>Search</label>
                    <input type="text" placeholder="temporary input field"/>
                </form>
            </div>
        </div>
    )
}

export default FAQ;