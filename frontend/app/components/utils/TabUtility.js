import { Tabs, TabList, Tab, Icon } from '@chakra-ui/react'

export default function TabUtility({ buttons, handleTabChange, view }) {
    return (
        <Tabs index={parseInt(localStorage.getItem('tab_index')) ?? view} onChange={handleTabChange}>
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
        </Tabs>
    )
}