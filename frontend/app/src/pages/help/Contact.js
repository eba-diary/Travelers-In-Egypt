import './css/Contact.css';
import React from 'react';
import 'firebase/database';
import emailjs from 'emailjs-com';
import { Col, Row, Card} from 'reactstrap';


function Contact() {
    return (
        <div>
            <div className="container">
                <Row>
                    <Col>
                        <p className='title-block'>General Contact Information:</p>
                        <div className='info-block'>
                            <p><b>Email:</b> lorem@ipsum.com</p>
                            <p><em>Send any applications, inquiries, or concerns to this email.</em></p>
                        </div>
                        <p className='title-block'>Contact Request Form:</p>
                        <div className='info-block'>
                            <p><b>Your Name:</b>
                                <input type="text" id="user-name"></input>
                            </p>
                            <p><b>Your Email:</b>
                                <input type="text" id="user-email"></input></p>
                            <p><b>Who would you like to contact?</b></p>
                            <select id="contact-dropdown">
                                <option value="patrick">Patrick Liu</option>
                                <option value="nathaniel">Nathaniel Backus</option>
                            </select>
                            <p><b>Reason for requesting: </b></p>
                            <input type="text" id="user-request"></input>
                            <p className='short'><em>The individual will be informed of your contact request once submitted. 
                                Your message will be forwarded to them, and you can expect a response 
                                within 2-3 business days.</em></p>
                            <button className='form-submit'>Submit</button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

const form = [
    { 
        title: "Name",
        type: "text",
        name: "name"
    }, 
    {
        title: "Email",
        type: "email",
        name: "email"
    }, 
];

// function Contact() {

//     return (
//         <div>
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <Form />
//                 </div>
//             </div>
//         </div>
//     )
// }

function Form() {

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID, 
            e.target, 
            process.env.REACT_APP_USER_ID)
        .then((result) => {
            console.log(result.text);
            // toggle successful message
            document.querySelector('.sent-successful').style.display = 'block';

            setTimeout(() => {
                document.querySelector('.sent-successful').style.display = 'none';
            }, 3500);

            e.target.reset();
        }, (error) => {
            console.log(error.text);
            document.querySelector('.sent-error').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.sent-error').style.display = 'none';
            }, 3500);
            // toggle unsuccesfful message sent
            // do not reset form
        });
        // e.target.reset()
    }

    return (
        <div className="col-6">
            <h1>Contact Us</h1>
            <form className="contact-form" onSubmit={sendEmail}>
                
                <div className="sent-successful">Message has been sent!</div>
                <div className="sent-error">Error occured. Try again later.</div>

                <div className="row">

                    {
                        form.map((input) => {
                            let fields = 
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <label className="form-label">{input.title}</label>
                                        </div>
                                        <div className="col-12">
                                            <input className="input" type={input.type} name={input.name}/>
                                        </div>
                                    </div>
                                </div>;
                            return fields;
                        })
                    }
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">Message</label>
                            </div>
                            <div className="col-12">
                                <textarea className="input-txt" type="text" name="message"/>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <input className='input input-btn' type="submit" value="Send" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Contact;