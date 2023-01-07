

// import './css/Contact.css';
import React from 'react';
// import 'firebase/database';
// import emailjs from 'emailjs-com';
import { VStack, HStack, Stack, Text, Button, Box, Textarea, Select } from '@chakra-ui/react';


export default function ContactForm() {
    return (
        <VStack>
            <VStack
            w='100%'
            alignItems='left'
            >
                <Stack>
                    <Box
                    paddingLeft='7%'
                    >
                        <Text
                        bg='#ffc55b'
                        display='inline-flex'
                        paddingLeft='5px'
                        paddingRight='10px'
                        fontWeight='600'
                        >
                        General Contact Information:
                        </Text>
                    </Box>
                </Stack>
                <Stack
                paddingLeft='8%'
                >
                    <Box
                    h='flex'
                    w='90%'
                    paddingLeft='5px'
                    marginBottom='15px'
                    borderLeft='3px solid #D08800'
                    bg='#ffe2ae'
                    >
                        <Text
                        paddingTop='5px'
                        paddingLeft='5px'
                        >
                            <Text>
                                <em style={{fontWeight: 600, fontStyle: 'initial'}}>Email: </em>
                                lorem@ipsum.com
                            </Text>
                        </Text>
                        <Text
                        fontStyle='italic'
                        paddingBottom='5px'
                        paddingLeft='5px'
                        >
                            Send any applications, inquiries, or concerns to this email.
                        </Text>
                    </Box>
                </Stack>
            </VStack>


            <VStack
            w='100%'
            alignItems='left'
            >
                <Stack>
                    <Box
                    paddingLeft='7%'
                    >
                        <Text
                        bg='#ffc55b'
                        display='inline-flex'
                        paddingLeft='5px'
                        paddingRight='10px'
                        fontWeight='600'
                        >
                        Contact Request Form:
                        </Text>
                    </Box>
                </Stack>
                <Stack
                paddingLeft='8%'
                >
                    <Box
                    h='flex'
                    w='90%'
                    paddingLeft='5px'
                    marginBottom='15px'
                    borderLeft='3px solid #D08800'
                    bg='#ffe2ae'
                    >
                        <Stack direction='row'>
                            <Text
                            paddingTop='5px'
                            paddingLeft='5px'
                            >
                                Your Name:
                            </Text>
                            <Textarea 
                            border='3px solid'
                            bg='#FFFFFF'
                            borderColor='#ffc55b'>
                                NAME FIELD
                            </Textarea>
                        </Stack>
                        <Stack direction='row'>
                            <Text
                            fontStyle='italic'
                            paddingBottom='5px'
                            paddingLeft='5px'
                            >
                                Your Email:
                            </Text>
                            <Textarea
                            border='3px solid'
                            borderColor='#ffc55b'
                            bg='#FFFFFF'>
                                EMAIL FIELD
                            </Textarea>
                        </Stack>
                        <Text>
                            Who are you trying to contact?
                        </Text>
                        <Select placeholder='Select option'
                        bg='#FFFFFF'
                        border='3px solid'
                        borderColor='#ffc55b'>
                            <option value='option1'>Option1</option>
                            <option value='option2'>Option2</option>
                            <option value='option3'>Option3</option>
                            <option value='option4'>Option4</option>
                        </Select>

                        <Text>
                            Reason for Requesting:
                        </Text>
                        <Textarea
                        bg='#FFFFFF'
                        border='3px solid'
                        borderColor='#ffc55b'>
                            CONTACT INFO
                        </Textarea>
                        <Stack direction='row'>
                            <Text fontStyle='italic'
                            padding='10px 50px 40px 5px'>
                                The individual will be informed of your 
                                contact request once submitted. Your message 
                                will be forwarded to them, and you can expect 
                                a response within 2 - 3 business days.
                            </Text>
                            <Button
                            border='20px 20px 20px 20px'
                            borderColor='#000000'
                            height='20px'
                            width='200px'
                            bgColor='#ffc55b'
                            padding='8px 50px 8px 40px'>
                                Submit
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </VStack>
        </VStack>
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
                                            <input className="input" type={input.type} name={input.name} />
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
                                <textarea className="input-txt" type="text" name="message" />
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
