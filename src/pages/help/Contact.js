import './css/Contact.css';
// import firebase from 'firebase/app';
import 'firebase/database';
import emailjs from 'emailjs-com';
// @TODO
// 1. input required field still allows empty messages sent
// 2. Need to create resizable message box

// function Form() {

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         // Get values of the inputs.
//         let name = getInputVal('name');
//         let email = getInputVal('email');
//         let text = getInputVal('text');

//         // Saves message.
//         saveMessage(name, email, text);

//         // Toggle succesful message sent.
//         document.querySelector('.alert').style.display = 'block';

//         // Hide alert after 3 seconds.
        // setTimeout(() => {
        //     document.querySelector('.alert').style.display = 'none';
        // }, 3500);

//         // Clear the form.
//         document.getElementById('contactForm').reset();

//     }

//     // Function to get form values.
//     const getInputVal = (id) => {
//         return document.getElementById(id).value; 
//     }

//     let messageRef = firebase.database().ref('messages');

//     const saveMessage = (name, email, text) => {
//         let newMessageRef = messageRef.push();
//         newMessageRef.set({
//             name: name,
//             email: email,
//             message: text
//         });
//     }

//     let contactForm =
//     return(contactForm);
// }



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

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Toggle succesful message sent.
    //     document.querySelector('.alert').style.display = 'block';

    //     // Hide alert after 3 seconds.
    //     setTimeout(() => {
    //         document.querySelector('.alert').style.display = 'none';
    //     }, 3500);

    //     // Clear the form.
    //     document.getElementById('contactForm').reset();
    // }

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
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">Name</label>
                            </div>
                            <div className="col-12">
                                <input className="input" type="text" name="name" />
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">Email</label>
                            </div>
                            <div className="col-12">
                                <input className="input" type="email" name="email" />
                            </div>
                        </div>
                    </div>
                    
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
{/* <form id='contactForm' onSubmit={sendEmail}>
<div>
<div className='col-12'>
<label htmlFor='name'>Name</label>
</div>
<input id='name' name='name' type='text' placeholder='optional'/>
</div>
<div>
<div className='col-12'>
<label htmlFor='email'>Email</label>
</div>
<input id='email' name='email' type='text' required/>
</div>
<div>
<div className='col-12'>
<label htmlFor='password'>Send us a message</label>
</div>
<input id='text' name='text' type='text' required/>
</div>
<MessageBox />
<button type='submit'>Submit</button>
</form> */}
{/* <div className="container">
    <div className='row'>
        <div className='alert'>Your message has been sent!</div>

    </div>
</div> */}