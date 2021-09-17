import './css/Contact.css';
// import firebase from 'firebase/app';
import 'firebase/database';
import emailjs from 'emailjs-com';
// @TODO
// 1. input required field still allows empty messages sent
// 2. Need to create resizable message box

// function Contact() {

//     const handleClick = () => {
//         window.open('mailto:emmabandrewsdiaryproject@gmail.com?subject=Inquiry');
//     }
//     // Contact form
//     let form = 
//         <div className='container'>
//             <div className='col-12 header'>
//                 <h1>Contact Us</h1>
//             </div>
//             <div>
//                 <p>
//                     We are working on an on-site contact form. 
//                     <span className='mail' onClick={handleClick}> Click here </span>
//                     to open your mailing client
//                 </p>
//             </div>
//             {/* <Form /> */}
//         </div>

//     return(form);
// }

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
//         setTimeout(() => {
//             document.querySelector('.alert').style.display = 'none';
//         }, 3500);

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
    console.log(process.env.SERVICE_ID);
    console.log(process.env.TEMPLATE_ID);
    console.log(process.env.USER_ID);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID, 
            e.target, 
            process.env.REACT_APP_USER_ID)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

    return (
        <form className="contact-form" onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="name" />

            <label>Email</label>
            <input type="email" name="email" />
            
            <label>Message</label>
            <textarea type="text" name="submit"/>

            <input type="submit" value="Send" />
        </form>
    );

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