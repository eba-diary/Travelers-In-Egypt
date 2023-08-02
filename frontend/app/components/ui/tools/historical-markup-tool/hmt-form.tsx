import { FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Textarea, Text, useToast, Button, Select } from "@chakra-ui/react"
import axios from "axios"
import qs from 'querystring'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Controller, FieldError, FormProvider, useForm } from "react-hook-form"
import { HMTFormProps, LICENSE } from "../../../../lib/types"

interface Props {
    stateData: {
        setShowEditor: Dispatch<SetStateAction<boolean>>,
        setXmlData: Dispatch<SetStateAction<string>>,
        handleTabsChange: () => void
    }
}

export default function HmtForm({ stateData }: Props) {

    const methods = useForm<HMTFormProps>({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            author: '',
            editor: '',
            publisher: '',
            publisher_address: '',
            publication_date: '',
            license: LICENSE.CC_Attr,
            source_description: '',
            project_description: '',
            raw_text: ''
        }
    })

    const [lastFormData, setLastFormData] = useState<HMTFormProps>(methods.getValues())

    const { control, handleSubmit, reset, formState: { isSubmitSuccessful } } = methods

    useEffect(() => {
        reset({
            title: '',
            author: '',
            editor: '',
            publisher: '',
            publisher_address: '',
            publication_date: '',
            license: LICENSE.CC_Attr,
            source_description: '',
            project_description: '',
            raw_text: ''
        })

    }, [isSubmitSuccessful, reset])

    const toast = useToast()

    const onSubmit = async (data: HMTFormProps) => {
        if (data) {
            try {
                const xmlData = await axios.post(
                    process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'https://tie-hmt-production.up.railway.app',
                    qs.stringify({
                        teiHeaderTitle: data.title,
                        teiHeaderAuthor: data.author,
                        teiHeaderEditor: data.editor,
                        teiHeaderPublisher: data.publisher,
                        teiHeaderPublisherAddress: data.publisher_address,
                        teiHeaderPublicationDate: data.publication_date,
                        teiHeaderLicense: data.license,
                        teiHeaderProjectDescription: data.project_description,
                        teiHeaderSourceDescription: data.source_description,
                        rawText: data.raw_text
                    }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                if (xmlData.status === 200) {
                    stateData.handleTabsChange()
                    stateData.setXmlData(xmlData.data)
                    stateData.setShowEditor(true)
                } else {
                    stateData.setXmlData('')
                    stateData.setShowEditor(false)
                }
            } catch (error) {
                toast({
                    status: 'error',
                    title: `Please fix the form errors: ${error}`,
                    isClosable: true,
                    duration: 3000
                })
            }
        } else {
            toast({
                status: 'error',
                title: 'Please fix the form errors',
                isClosable: true,
                duration: 3000
            })
        }
    }
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={(event) => {
                    setLastFormData(methods.getValues())
                    handleSubmit(onSubmit)(event)
                }}

                onKeyDown={(event) => {
                    if (event.shiftKey && event.key == 'Enter') {
                        setLastFormData(methods.getValues())
                        handleSubmit(onSubmit)(event)
                    }
                }}
            >
                <Stack width='100%' alignItems='center'>
                    <Stack width={{ base: '95%', md: '75%', lg: '65%' }}>
                        <Controller
                            control={control}
                            name='title'
                            render={({ field: { onChange, value } }) => (
                                <FormControl display='flex' flexDirection='column' alignItems='flex-start'>
                                    <FormLabel>
                                        Title
                                    </FormLabel>
                                    <Input
                                        borderRadius='5px'
                                        onChange={onChange}
                                        value={value}
                                    />
                                </FormControl>
                            )}
                        />
                        <HStack width='100%' justifyContent='flex-start'>
                            <Controller
                                control={control}
                                name='author'
                                render={({ field: { onChange, value } }) => (
                                    <FormControl display='flex' flexDirection='column' alignItems='flex-start'>
                                        <FormLabel>
                                            Author
                                        </FormLabel>
                                        <Input
                                            borderRadius='5px'
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </FormControl>
                                )}
                            />
                            <Controller
                                control={control}
                                name='editor'
                                render={({ field: { onChange, value } }) => (
                                    <FormControl display='flex' flexDirection='column' alignItems='flex-start'>
                                        <FormLabel>
                                            Editor
                                        </FormLabel>
                                        <Input
                                            borderRadius='5px'
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </FormControl>
                                )}
                            />
                        </HStack>
                        <Controller
                            control={control}
                            name='publisher'
                            render={({ field: { onChange, value } }) => (
                                <FormControl display='flex' flexDirection='column' alignItems='flex-start'>
                                    <FormLabel>
                                        Publisher
                                    </FormLabel>
                                    <Input
                                        borderRadius='5px'
                                        onChange={onChange}
                                        value={value}
                                    />
                                </FormControl>
                            )}
                        />
                        <HStack width='100%' justifyContent='flex-start'>
                            <Controller
                                control={control}
                                name='publisher_address'
                                render={({ field: { onChange, value } }) => (
                                    <FormControl display='flex' flexDirection='column' alignItems='flex-start'>
                                        <FormLabel>
                                            Publisher Address
                                        </FormLabel>
                                        <Input
                                            borderRadius='5px'
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </FormControl>
                                )}
                            />
                            <Controller
                                control={control}
                                name='publication_date'
                                render={({ field: { onChange, value } }) => (
                                    <FormControl display='flex' flexDirection='column' alignItems='flex-start'>
                                        <FormLabel>
                                            Publication Date
                                        </FormLabel>
                                        <Input
                                            borderRadius='5px'
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </FormControl>
                                )}
                            />
                        </HStack>
                        <Controller
                            control={control}
                            name='license'
                            render={({ field: { onChange, value } }) => (
                                <FormControl display='flex' flexDirection='column' alignItems='flex-start'>
                                    <FormLabel>
                                        License
                                    </FormLabel>
                                    <Select
                                        onChange={onChange}
                                        value={value}
                                    >
                                        {Object.values(LICENSE).map((entry, index) => (
                                            <option key={index} value={entry.toString()}>
                                                {entry.toString()}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name='source_description'
                            render={({ field: { onChange, value } }) => (
                                <FormControl display='flex' flexDirection='column' alignItems='flex-start'>
                                    <FormLabel>
                                        Source Description
                                    </FormLabel>
                                    <Textarea
                                        borderRadius='5px'
                                        onChange={onChange}
                                        value={value}
                                    />
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name='project_description'
                            render={({ field: { onChange, value } }) => (
                                <FormControl display='flex' flexDirection='column' alignItems='flex-start'>
                                    <FormLabel>
                                        Project Description
                                    </FormLabel>
                                    <Textarea
                                        borderRadius='5px'
                                        onChange={onChange}
                                        value={value}
                                    />
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name='raw_text'
                            rules={{
                                validate: (data: string) => {
                                    if (data.length <= 0) return 'Text required'
                                    return true
                                }
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl isInvalid={!!error} display='flex' flexDirection='column' alignItems='flex-start'>
                                    <FormLabel>
                                        Text (required)
                                    </FormLabel>
                                    <Textarea
                                        borderRadius='5px'
                                        onChange={onChange}
                                        value={value}
                                    />
                                    <FormErrorMessage>
                                        <Text>{(error as FieldError)?.message}</Text>
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                    </Stack>
                </Stack>
                <Stack width='100%' padding='25px 40px'>
                    <HStack width='85%' justifyContent='flex-end'>
                        <Button onClick={() => {
                            reset({
                                title: '',
                                author: '',
                                editor: '',
                                publisher: '',
                                publisher_address: '',
                                publication_date: '',
                                license: LICENSE.CC_Attr,
                                source_description: '',
                                project_description: '',
                                raw_text: ''
                            })

                            toast({
                                title: 'Form Cleared',
                                status: 'success',
                                duration: 3000,
                                position: 'top'
                            })
                        }}>
                            Clear Form
                        </Button>
                        <Button type='submit'>
                            Submit
                        </Button>
                    </HStack>
                </Stack>
            </form>
        </FormProvider >
    )
}