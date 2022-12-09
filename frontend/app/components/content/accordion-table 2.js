import {
    Stack,
    Flex,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useDisclosure
} from "@chakra-ui/react";

export default function AccordionTable({ children, title, defaultIndex }) {
    const { isOpen, onToggle } = useDisclosure()
    const open = defaultIndex ? !isOpen : isOpen
    return (
        <>
            <Stack paddingBottom='20px'>
                <AccordionItem
                    justifyContent='space-between'
                    border='4px solid #FBE2B5'
                    boxShadow='0px 3px #FBE2B5'
                >
                    <AccordionButton
                        backgroundColor={open ? '#FBE2B5' : '#FFF'}
                        _hover={{ backgroundColor: '#FBE2B5' }}
                        onClick={onToggle}
                    >
                        <Flex flex={1}>
                            {title}
                        </Flex>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        {/* {data.description} */}
                        {children}
                    </AccordionPanel>
                </AccordionItem>
            </Stack>
        </>
    )
}

