import { HStack, Stack, Text } from "@chakra-ui/react";
import MarginStack from './MarginStack'
import Image from 'next/image'
import vercelBanner from '../../public/powered-by-vercel.svg'

export default function Footer() {
	return (
		<HStack
			width='100%'
			backgroundColor='#C58A22'
			height='180px'
			justifyContent='flex-end'
		>
			<MarginStack>
				<Stack
					width='190px'
					height='40px'
					_hover={{ cursor: 'pointer' }}
					onClick={() => {
						window.open(
							'https://vercel.com/dashboard?utm_source=travelers-in-egypt&utm_campaign=oss'
						)
					}}
				>
					<Image
						src={vercelBanner}
						alt='vercel banner'
						width={1}
						height={1}
						layout='responsive'
						objectFit='contain'
					/>
				</Stack>
			</MarginStack>
		</HStack>
	)
}