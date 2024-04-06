import { HStack, Stack, Text, Hide, Show, Menu, MenuButton, IconButton, MenuList, Box } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import logo from '../../public/WebLogo.png';
import { FaSearch } from "react-icons/fa"
import { FaGear } from "react-icons/fa6"
import { NAVIGATION_TABS } from '../json-data/navigation';
import { PRIMARY_BG_COLOR } from '../styles.config';

export default function NavigationTabs() {
	return (
		<Stack width="100%" backgroundColor={PRIMARY_BG_COLOR}>
			<HStack width="100%" px="8px">
				<Stack flex={1}>
					{/* for logo if we want */}
				</Stack>
				<nav style={{
					display: "flex",
					flexDirection: "row",
					flex: 6,
					justifyContent: "space-evenly"
				}}>
					{NAVIGATION_TABS.map(tab => {
						return (
							<ul>
								<Box
									paddingX="4px"
									paddingTop="1px"
									paddingBottom="1px"
									transition="0.1s"
									fontWeight={600}
									_hover={{
										paddingBottom: "0px",
										borderBottom: "1px",
										cursor: "pointer"
									}}
								>
									<Text fontSize="md">{tab.name}</Text>
								</Box>
							</ul>
						)
					})}
				</nav>
				<HStack
					flex={2}
					justifyContent="flex-end"
					gap="12px"
					py="8px"
				>
					<IconButton
						aria-label="search"
						as={FaSearch}
						padding="8px"
						_hover={{
							cursor: "pointer"
						}}
						variant="outline"
						colorScheme="teal"
						backgroundColor={PRIMARY_BG_COLOR}
					/>
					<IconButton
						aria-label="search"
						as={FaGear}
						padding="8px"
						_hover={{
							cursor: "pointer"
						}}
						_active={{
							backgroundColor: "#FFF"
						}}
						backgroundColor={PRIMARY_BG_COLOR}
					/>
				</HStack>
			</HStack>
		</Stack>
	)
}

function handleEvent(event, number) {
	event.currentTarget.style.cursor = 'pointer'
	event.currentTarget.style.transform = `translateY(${number}px)`
	event.currentTarget.style.transition = '0.3s'
}