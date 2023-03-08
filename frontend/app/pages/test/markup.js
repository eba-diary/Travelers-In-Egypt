import { Stack, Text, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function Markup() {

    const [markup, setMarkup] = useState(null)

    const handleClick = async () => {
        const getData = async () => {
            const data = await fetch('http://3.18.176.115/', {
                method: 'POST',
                body: {
                    teiHeaderTitle: 'hello',
                    teiHeaderAuthor: 'hello',
                    teiHeaderEditor: 'hello',
                    teiHeaderPublisher: 'hello',
                    teiHeaderPublisherAddress: 'hello',
                    teiHeaderPublicationDate: 'hello',
                    teiHeaderLicense: 'hello',
                    teiHeaderProjectDescription: 'hello',
                    teiHeaderSourceDescription: 'hello',
                }
            })
            return data
        }

        setMarkup(await getData())
    }

    return (
        <Stack>
            <Text>
                Test Markup Tool (view console)
            </Text>
            <Button onClick={handleClick}>Test</Button>
            {markup && (
                <Stack>
                    {markup}
                </Stack>
            )}
        </Stack>
    )
}