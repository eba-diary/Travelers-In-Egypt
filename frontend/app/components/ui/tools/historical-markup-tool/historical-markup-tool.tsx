import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useState } from "react";
import usePageNumber from "../../../../lib/hooks/usePageNumber";
import HmtForm from "./hmt-form";
import XmlIDE from "./XMLIDE";

export default function HistoricalMarkupToolComponent() {
    usePageNumber(4)

    const [showEditor, setShowEditor] = useState<boolean>(false)
    const [xmlData, setXmlData] = useState<string>('')
    const [tabIndex, setTabIndex] = useState<number>(0)

    const handleTabsChange = () => {
        setTabIndex(tabIndex === 0 ? 1 : 0)
    }

    return (
        <Stack width='100%' alignItems='center'>
            <Stack width='90%'>
                <Text fontSize='36px' fontWeight={700} textAlign='center'>
                    Historical Markup Tool
                </Text>
                <Text>
                    Todo: Move submit and clear form to the side. Create a side control bar with the following: 1. Fill form with last form data 2. history of form submissions 3. Checkbox to lock fields that should not be reset, ex same author and title, different raw text 4. Checkbox to allow useres to always use previous form data and 5. hot keys to toggle the form fields.
                </Text>
                <Tabs index={tabIndex} isLazy>
                    <TabList>
                        <Tab onClick={() => setTabIndex(0)}>
                            Input
                        </Tab>
                        <Tab isDisabled={!showEditor} onClick={() => setTabIndex(1)}>
                            Output Editor
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <HmtForm
                                stateData={{
                                    setShowEditor,
                                    setXmlData,
                                    handleTabsChange
                                }}
                            />
                        </TabPanel>
                        <TabPanel>
                            <XmlIDE
                                data={{
                                    code: xmlData,
                                    setShowEditor
                                }}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                {/* {!showEditor ? (
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
                )} */}
            </Stack>
        </Stack>
    )
}