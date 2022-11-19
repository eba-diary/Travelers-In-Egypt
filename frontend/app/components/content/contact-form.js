

// import './css/Contact.css';
import React from 'react';
// import 'firebase/database';
// import emailjs from 'emailjs-com';
import { VStack, HStack, Stack, Text, Button, Box } from '@chakra-ui/react';


export default function ContactForm() {
    return (
        <VStack>
            <VStack>
                <Stack>
                    <Box
                        h='flex'
                        w='flex'
                        direction='column'
                        alignItems='center'
                        justifyContent='center'
                        paddingLeft='5px'
                        paddingRight='10px'
                        marginBottom='15px'
                        bg='#ffc55b'
                    >
                        General Contact Information:
                    </Box>
                </Stack>
                <Box
                    h='flex'
                    w='95%'
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    paddingLeft='5px'
                    marginBottom='15px'
                    // border='5px'
                    // border-color='#d08800'
                    bg='#ffe2ae'
                >
                    <Text>
                        Email: lorem@ipsum.com
                    </Text>
                    <Text>
                        Send any applications, inquiries, or concerns to this email.
                    </Text>
                </Box>
            </VStack>
            <VStack>
                <Stack>
                    <Text
                        background-color='#ffc55b'
                        padding-left='5px'
                        font-weight='700'
                        margin='10px'
                    >
                        Contact Request Form:
                    </Text>
                </Stack>
                <VStack
                    border-left-width='3px'
                    border-color='#d08800'
                    background-color='#ffe2ae'
                    padding-left='10px'
                    margin-bottom='40px'
                >
                    <HStack>
                        <Stack>
                            <Text>Your Name:</Text>
                        </Stack>
                        <Stack>
                            <Form> XXXX </Form>
                        </Stack>
                    </HStack>
                    <HStack>
                        <Stack>
                            <Text>Your Email:</Text>
                        </Stack>
                        <Stack>
                            <Form> XXXX </Form>
                        </Stack>
                    </HStack>
                    <HStack>
                        <Stack>
                            <Text>Who would you like to contact?</Text>
                        </Stack>
                        <Stack>
                            <Form> XXXX </Form>
                        </Stack>
                    </HStack>
                    <VStack>
                        <Stack>
                            <Text>Reason for requesting:</Text>
                        </Stack>
                        <Form> XXXX </Form>
                    </VStack>
                    <HStack> text and button
                        <Stack>
                            the individual etc
                        </Stack>
                        <Stack>
                            <Button>
                                Submit
                            </Button>
                        </Stack>
                    </HStack>
                </VStack>
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
