import { Accordion, AccordionItem, Text, Stack, AccordionButton, AccordionPanel, Box, AccordionIcon, HStack, IconButton } from "@chakra-ui/react";
import { AiOutlineLinkedin, AiOutlineMail } from 'react-icons/ai'

export default function Collapse({ data, type }) {
    return (
        <Stack padding='10px'>
            <Accordion allowToggle>
                {data.map((entry, index) => (
                    <Stack padding='5px'>
                        <AccordionItem
                            key={index}
                            border='1px solid #C58A22'
                            onFocus={(event) => {
                                event.currentTarget.style.backgroundColor = '#C58A22'
                            }}
                            onBlur={(event) => {
                                event.currentTarget.style.backgroundColor = '#FFF'
                            }}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.color = '#FFF'
                                event.currentTarget.style.backgroundColor = '#C58A22'
                                event.currentTarget.style.transition = '0.1s'
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.backgroundColor = '#FFF'
                                event.currentTarget.style.color = '#000'
                                event.currentTarget.style.transition = '0.1s'
                            }}
                        >
                            <AccordionButton>
                                <Box as='span' flex={1} textAlign='left'>
                                    {entry.title}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            {(() => {
                                if (type == 'general-information') {
                                    return (
                                        <AccordionPanel backgroundColor='#ffdc9e' color='#000'>
                                            {entry.items.description}
                                        </AccordionPanel>
                                    )
                                } else if (type == 'student-contributors') {
                                    return (
                                        <AccordionPanel backgroundColor='#FFF' color='#000'>
                                            <HStack gap='50px'>
                                                {entry.contributor.map((student, index) => {
                                                    return (
                                                        <Stack key={index}>
                                                            <Text>{student.name}</Text>
                                                            <HStack>
                                                                {student.email && (
                                                                    <IconButton
                                                                        aria-label={`${student.name}\'s email: ${student.email}`}
                                                                        icon={<AiOutlineMail size='md' />}
                                                                        size='sm'
                                                                    />
                                                                )}
                                                                {student.linkedin && (
                                                                    <IconButton
                                                                        aria-label={`${student.name}\'s linkedin: ${student.linkedin}`}
                                                                        icon={<AiOutlineLinkedin size='md' />}
                                                                        colorScheme='messenger'
                                                                        size='sm'
                                                                    />
                                                                )}
                                                            </HStack>
                                                        </Stack>
                                                    )
                                                })}
                                            </HStack>
                                        </AccordionPanel>
                                    )
                                }
                            })()}
                        </AccordionItem>
                    </Stack>
                ))
                }
            </Accordion >
        </Stack >
    )
}