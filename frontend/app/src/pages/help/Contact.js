import './css/Contact.css';
import React from 'react';
import 'firebase/database';
import emailjs from 'emailjs-com';

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

function Contact() {

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <Form />
                </div>
            </div>
        </div>
    )
}

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