import '../../css/Contact.css';
import firebase from 'firebase/app';
import 'firebase/database';

// @TODO
// 1. input required field still allows empty messages sent
// 2. Need to create resizable message box

function Contact() {

    let form = 
        <div className='container'>
            <div className='col-12'>
                <h1>Contact Us</h1>
            </div>
            <Form />
        </div>

    return(form);
}

function Form() {

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Get values
        let name = getInputVal('name');
        let email = getInputVal('email');
        let text = getInputVal('text');

        // save message
        saveMessage(name, email, text);

        // toggle succesful message sent
        document.querySelector('.alert').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').style.display = 'none';
        }, 3000);

        // Clear form
        document.getElementById('contactForm').reset();

    }

    // Function to get form values
    const getInputVal = (id) => {
        return document.getElementById(id).value; 
    }

    let messageRef = firebase.database().ref('messages');

    const saveMessage = (name, email, text) => {
        let newMessageRef = messageRef.push();
        newMessageRef.set({
            name: name,
            email: email,
            message: text
        });
    }

    let contactForm =
        <div className='row'>
            <div className='alert'>Your message has been sent!</div>
            <form id='contactForm'>
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
                {/* <MessageBox /> */}
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    return(contactForm);
}
export default Contact;