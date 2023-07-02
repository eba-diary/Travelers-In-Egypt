import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button, HStack, IconButton, Stack, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { LuClipboardCopy } from 'react-icons/lu'
import { BiFullscreen } from 'react-icons/bi'

interface Props {
    data: {
        code: string,
        setShowEditor: Dispatch<SetStateAction<boolean>>
    }
}

export default function XmlIDE({ data }: Props) {
    const [xmlCode, setXmlCode] = useState<string>(data.code)

    useEffect(() => {
        setXmlCode(data.code)
    }, [data])

    const toast = useToast()

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(xmlCode)
            toast({
                title: 'Copied to clipboard',
                status: 'success',
                duration: 3000,
                position: 'top',
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Copy failed',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    return (
        <Stack width='100%' alignItems='center'>
            <Stack width='60%'>
                <HStack width='100%' justifyContent='space-between'>
                    <IconButton
                        aria-label='Copy to clipboard.'
                        icon={<LuClipboardCopy />}
                        onClick={handleCopyClick}
                    />
                </HStack>
                <Stack borderRadius='5px' border='1px'>
                    <Editor
                        height='500px'
                        defaultLanguage='xml'
                        defaultValue={xmlCode}
                        theme='vs-dark'
                        options={{
                            wordWrap: 'on',
                            wrappingIndent: 'indent',
                            padding: {
                                top: 20
                            },
                        }}
                        onChange={(value) => setXmlCode(value)}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}