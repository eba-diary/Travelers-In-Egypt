import { Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import usePageNumber from "../../../../lib/hooks/usePageNumber";
import HmtForm from "./hmt-form";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import XmlIDE from "./XMLIDE";

export default function HistoricalMarkupToolComponent() {
    usePageNumber(4)

    const [showEditor, setShowEditor] = useState<boolean>(false)
    const [xmlData, setXmlData] = useState<string>('')


    return (
        <Stack width='100%' alignItems='center'>
            <Stack width='90%'>
                <Text fontSize='36px' fontWeight={700} textAlign='center'>
                    Historical Markup Tool
                </Text>
                {!showEditor ? (
                    <HmtForm
                        stateData={{
                            setShowEditor,
                            setXmlData
                        }}
                    />
                ) : (
                    <XmlIDE
                        data={{
                            code: xmlData,
                            setShowEditor
                        }}
                    />
                )}
            </Stack>
        </Stack>
    )
}