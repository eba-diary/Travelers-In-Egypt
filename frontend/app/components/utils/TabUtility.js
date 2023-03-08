import { Tabs, TabList, Tab, Icon, TabPanels, TabPanel, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import React from 'react'

export default function TabUtility({ buttons, handleTabChange, children }) {
    const childrenArray = useMemo(() => {
        return React.Children.toArray(children).map((entry, index) => (
            <TabPanel key={index}>
                {entry}
            </TabPanel>
        ))
    })

    return (
        <Tabs onChange={handleTabChange} defaultIndex={0}>
            <TabList>
                {buttons.map((entry, index) => (
                    <Tab key={index}>
                        <Icon
                            aria-label={entry.ariaLabel}
                            as={entry.icon}
                        />
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {childrenArray}
            </TabPanels>
        </Tabs>
    )
}