import React, { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useToast, VStack, HStack, Stack, Text, Button, Textarea, Select, Input, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useEffect } from 'react';


export default function TeamForm() {
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
        <VStack gap='20px'>
            <Stack width='100%' alignItems='center'>
                <Stack width='85%'>
                    <Text fontSize='45px' fontWeight={800}>
                        DONATIONS
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
                            Interested in donating? Fill out this form:
                        </Text>
                    </Stack>
                    <Stack width='100%' alignItems='center'>
                        <Stack
                            width='100%'
                            padding='10px'
                            borderLeft='3px solid #D08800'
                            bg='#ffe2ae'
                        >
                            <VStack
                                alignItems='left'
                                width={{ base: '100%', md: '60%' }}
                                padding='20px 10px'
                            >
                                <HStack alignItems='flex-end'>
                                    <FormLabel>Name:</FormLabel>
                                    <Input
                                        borderRadius=''
                                        height='35px'
                                        border='3.5px solid' 
                                        backgroundColor='#FFF'
                                        borderColor='#FFC55B'
                                    />
                                </HStack>
                                <HStack alignItems='flex-end'>
                                    <FormLabel>Email:</FormLabel>
                                    <Input
                                        height='35px'
                                        borderRadius=''
                                        border='3.5px solid'
                                        backgroundColor='#FFF'
                                        borderColor='#FFC55B'
                                    />
                                </HStack>
                                <Stack
                                fontStyle='italic'
                                height='fit-content'
                                flex={5}
                                fontWeight={500}
                                >
                                    <Text>
                                        The information above will only be used to send a reciept to the recipient.
                                    </Text>
                                    <Text>
                                        Please continue by clicking on the button below to be redirected to a secure, external site.
                                    </Text>
                                </Stack>
                                <Button
                                    h='80px' w='300px' 
                                    boxShadow='5px 5px 0px 0px #ffc55b'
                                    borderRadius=''
                                    background='#de9816'//d08800//de9816
                                > 
                                    <VStack>
                                        <Text fontWeight='bold' textColor='#FFF'>
                                            CLICK HERE TO DONATE
                                        </Text>
                                        <Text fontWeight='light' textColor='#FFF'>
                                            (External Application Link)
                                        </Text>
                                    </VStack>
                                </Button>
                            </VStack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack width='100%' alignItems='center'>
                <Stack width='85%'>
                    <Text fontSize='45px' fontWeight={800}>
                        GET INVOLVED
                    </Text>
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
                        Interested in joining the team? Fill out this form:
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
                                <Stack padding='10px 0px'>
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
                                                <Stack width={{ base: '100%', md: '60%' }}>
                                                    <HStack alignItems='flex-end'>
                                                        
                                                        <FormLabel alignItems='flex-end'>Name:</FormLabel>
                                                        <Input
                                                            height='35px'
                                                            borderRadius=''
                                                            backgroundColor='#FFF'
                                                            borderColor='#FFC55B'
                                                            border={error ? '1px solid' : '3.5px solid'}
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
                                                <Stack width={{ base: '100%', md: '60%' }}>
                                                    <HStack alignItems='flex-end'>
                                                        <FormLabel>Email:</FormLabel>
                                                        <Input
                                                            height='35px'
                                                            borderRadius=''
                                                            backgroundColor='#FFF'
                                                            borderColor='#FFC55B'
                                                            border={error ? '1px solid' : '3.5px solid'}
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
                                            <HStack paddingBottom='25px's>
                                                <FormLabel>What role are you interested in? Please select from the following:</FormLabel>
                                                <Select
                                                    height='35px'
                                                    placeholder='Select option'
                                                    bg='#FFFFFF'
                                                    borderColor='#FFC55B'
                                                    border={error ? '1px solid' : '3.5px solid'}
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
                                            <FormLabel>Tell us about yourself and your skills. What do you plan to bring to the team?</FormLabel>
                                            <Textarea
                                                height='35px'
                                                borderRadius=''
                                                onChange={onChange}
                                                value={value}
                                                onFocus={() => setDisplaySubmitShortcut(true)}
                                                onBlur={() => setDisplaySubmitShortcut(false)}
                                                borderColor='#FFC55B'
                                                border={error ? '1px solid' : '3.5px solid'}
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
                                        Our project manager will be informed of your
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
