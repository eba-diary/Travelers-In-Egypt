import { Tabs, TabList, Tab, IconButton } from '@chakra-ui/react'

export default function TabUtility({ buttons }) {
    return (
        <Tabs>
            <TabList>
                {buttons.map((entry, index) => (
                    <Tab key={index}>
                        <IconButton
                            aria-label={entry.ariaLabel}
                            icon={entry.icon}
                        />
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    )
}