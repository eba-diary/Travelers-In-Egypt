
import React, { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useToast, VStack, HStack, Stack, Text, Button, Textarea, Select, Input, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useEffect } from 'react';


export default function ContactForm() {
    const [displaySubmitShortcut, setDisplaySubmitShortcut] = useState(false)

    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            select: '',
            response: ''
        }
    })

    const { control, watch, handleSubmit, reset, formState: { isSubmitSuccessful } } = methods

    useEffect(() => {
        reset({
            name: '',
            email: '',
            select: '',
            response: ''
        }, {
            keepIsValid: true
        })
    }, [isSubmitSuccessful, reset])

    const toast = useToast()
    const onSubmit = (data) => {
        toast({
            title: JSON.stringify(data),
            status: 'success',
            duration: 3000
        })
    }

    const watchTextArea = watch('response')

    return (
        <VStack gap='50px'>
            <Stack width='100%' alignItems='center'>
                <Stack width='85%'>
                    <Text fontSize='45px' fontWeight={800}>
                        Contact Us
                    </Text>
                </Stack>
            </Stack>
            <Stack
                w='100%'
                alignItems='center'
            >
                <Stack width='85%'>
                    <Stack width='85%'>
                        <Text
                            width='fit-content'
                            bg='#ffc55b'
                            paddingLeft='5px'
                            paddingRight='5px'
                            fontWeight='600'
                        >
                            General Contact Information:
                        </Text>
                    </Stack>
                    <Stack width='100%' alignItems='center'>
                        <Stack
                            width='100%'
                            padding='10px'
                            borderLeft='3px solid #D08800'
                            bg='#ffe2ae'
                        >
                            <Text
                                paddingTop='5px'
                                paddingLeft='5px'
                            >
                                <Text>
                                    <em style={{ fontWeight: 600, fontStyle: 'initial' }}>Email: </em>
                                    lorem@ipsum.com
                                </Text>
                            </Text>
                            <Text
                                fontStyle='italic'
                                paddingBottom='5px'
                                paddingLeft='5px'>
                                Send any applications, inquiries, or concerns to this email.
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack width='100%' alignItems='center'>
                <Stack width='85%'>
                    <Text
                        width='fit-content'
                        bg='#ffc55b'
                        paddingLeft='5px'
                        paddingRight='5px'
                        fontWeight='600'
                    >
                        Contact Request Form:
                    </Text>
                </Stack>
                <Stack width='100%' alignItems='center'>
                    <Stack
                        width='85%'
                        padding='10px'
                        borderLeft='3px solid #D08800'
                        bg='#ffe2ae'
                    >
                        <FormProvider {...methods}>
                            <form
                                onSubmit={(event) => {
                                    handleSubmit(onSubmit)(event)
                                }}
                                onKeyDown={(event) => {
                                    if (event.shiftKey && event.key === 'Enter') {
                                        (handleSubmit(onSubmit))(event)
                                    }
                                }}
                            >
                                <Stack gap='15px' padding='10px 0px'>
                                    <Controller
                                        name='name'
                                        control={control}
                                        rules={{
                                            validate: (data) => {
                                                if (data.length === 0) return 'Please enter a name'
                                                return true
                                            }
                                        }}
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <FormControl isInvalid={!!error}>
                                                <Stack width={{ base: '100%', md: '60%' }} height='75px'>
                                                    <HStack>
                                                        <FormLabel>Name:</FormLabel>
                                                        <Input
                                                            backgroundColor='#FFF'
                                                            borderColor='#FFC55B'
                                                            border={error ? '1px solid' : '2px solid'}
                                                            onChange={onChange}
                                                            value={value}
                                                        />
                                                    </HStack>
                                                    <Stack width='100%' alignItems='flex-end'>
                                                        <FormErrorMessage>
                                                            <Text>{error ? error.message : ''}</Text>
                                                        </FormErrorMessage>
                                                    </Stack>
                                                </Stack>
                                            </FormControl>
                                        )}
                                    />
                                    <Controller
                                        name='email'
                                        control={control}
                                        rules={{
                                            validate: (data) => {
                                                if (data.length === 0) return 'Please enter an email'
                                                return true
                                            }
                                        }}
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <FormControl isInvalid={!!error}>
                                                <Stack width={{ base: '100%', md: '60%' }} height='75px'>
                                                    <HStack>
                                                        <FormLabel>Email:</FormLabel>
                                                        <Input
                                                            backgroundColor='#FFF'
                                                            borderColor='#FFC55B'
                                                            border={error ? '1px solid' : '2px solid'}
                                                            onChange={onChange}
                                                            type='email'
                                                            value={value}
                                                        />
                                                    </HStack>
                                                    <Stack width='100%' alignItems='flex-end'>
                                                        <FormErrorMessage>
                                                            <Text>{error ? error.message : ''}</Text>
                                                        </FormErrorMessage>
                                                    </Stack>
                                                </Stack>
                                            </FormControl>
                                        )}
                                    />
                                </Stack>
                                <Controller
                                    name='select'
                                    control={control}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <FormControl isInvalid={!!error}>
                                            <HStack paddingBottom='25px'>
                                                <FormLabel>What department are you contacting?</FormLabel>
                                                <Select
                                                    placeholder='Select option'
                                                    bg='#FFFFFF'
                                                    borderColor='#FFC55B'
                                                    border={error ? '1px solid' : '2px solid'}
                                                    borderRadius='1px'
                                                    width='60%'
                                                    value={value}
                                                    onChange={onChange}
                                                >
                                                    <option value='option1'>Option1</option>
                                                    <option value='option2'>Option2</option>
                                                    <option value='option3'>Option3</option>
                                                    <option value='option4'>Option4</option>
                                                </Select>
                                            </HStack>
                                            <FormErrorMessage>
                                                <Text>{error ? error.message : ''}</Text>
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                />
                                <Controller
                                    name='response'
                                    rules={{
                                        validate: (data) => {
                                            if (data.length == 0) return 'Message cannot be empty'
                                            if (data.length > 1024) return 'Exceeded max character length'
                                            return true
                                        }
                                    }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <FormControl isInvalid={!!error}>
                                            <FormLabel>Questions, Comments, Concerns:</FormLabel>
                                            <Textarea
                                                onChange={onChange}
                                                value={value}
                                                onFocus={() => setDisplaySubmitShortcut(true)}
                                                onBlur={() => setDisplaySubmitShortcut(false)}
                                                borderColor='#FFC55B'
                                                border={error ? '1px solid' : '2px solid'}
                                                backgroundColor='#FFF'
                                                placeholder='Enter your message'
                                            />
                                            <HStack
                                                display='flex'
                                                alignItems='center'
                                                justifyContent={error || displaySubmitShortcut ? 'space-between' : 'flex-end'}
                                            >
                                                <FormErrorMessage>
                                                    <Text fontSize='15px'>{error ? error.message : ''}</Text>
                                                </FormErrorMessage>
                                                {!error && displaySubmitShortcut && (
                                                    <Stack paddingTop='10px'>
                                                        <Text fontSize='13px' fontWeight={500} fontStyle='italic'>
                                                            Shift + Enter to submit
                                                        </Text>
                                                    </Stack>
                                                )}
                                                <Stack paddingTop='10px'>
                                                    <Text
                                                        textAlign='right'
                                                        color={error ? 'tomato' : '#000'}
                                                        fontSize='15px'
                                                    >
                                                        {watchTextArea.length}/1024 characters
                                                    </Text>
                                                </Stack>
                                            </HStack>
                                        </FormControl>
                                    )}
                                />
                                <HStack
                                    gap='20px'
                                    alignItems='space-between'
                                    padding='25px'
                                >
                                    <Text
                                        fontStyle='italic'
                                        height='fit-content'
                                        flex={5}
                                        fontWeight={500}
                                    >
                                        The individual will be informed of your
                                        contact request once submitted. Your message
                                        will be forwarded to them, and you can expect
                                        a response within 2 - 3 business days.
                                    </Text>
                                    <Button
                                        width='fit-content'
                                        bgColor='#FFC55B'
                                        borderRadius='4px'
                                        type='submit'
                                    >
                                        Submit
                                    </Button>
                                </HStack>
                            </form>
                        </FormProvider>
                    </Stack>
                </Stack>
            </Stack>
        </VStack >
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
