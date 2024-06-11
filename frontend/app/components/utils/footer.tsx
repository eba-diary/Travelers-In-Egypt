// components/Footer.tsx
import React from 'react';
import Image from 'next/image';
import { Box, Flex, Link, IconButton, HStack, Stack } from '@chakra-ui/react';
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import vercelBanner from '../../public/powered-by-vercel.svg'
import { FOOTER_LINKS } from '../json-data/navigation';
import { BLACK, WHITE } from '../styles.config';

export const Footer: React.FC = () => {
	return (
		<Box as="footer" bg={BLACK} color={WHITE} py={4}>
			<Flex
				width="8xl"
				mx="auto"
				justify="space-between"
				flexDirection={{ base: "column", md: "row" }}
			>
				<HStack spacing={4} mb={{ base: 4, md: 0 }}>
					{FOOTER_LINKS.map((link) => (
						<Link key={link.name} href={link.url} _hover={{ textDecoration: "none", color: "gray.400" }}>
							{link.name}
						</Link>
					))}
				</HStack>
				<HStack spacing={4} alignItems="center">
					<IconButton
						as="a"
						href="https://github.com"
						aria-label="GitHub"
						icon={<FaGithub size="28px" />}
						variant="ghost"
						color="white"
						_hover={{ bg: "gray.700" }}
					/>
					<IconButton
						as="a"
						href="https://facebook.com"
						aria-label="Facebook"
						icon={<FaFacebook size="28px" />}
						variant="ghost"
						color="white"
						_hover={{ bg: "gray.700" }}
					/>
					<IconButton
						as="a"
						href="https://instagram.com"
						aria-label="Instagram"
						icon={<FaInstagram size="28px" />}
						variant="ghost"
						color="white"
						_hover={{ bg: "gray.700" }}
					/>
					<Stack
						width="190px"
						height="40px"
						_hover={{ cursor: 'pointer' }}
						onClick={() => {
							window.open(
								'https://vercel.com/dashboard?utm_source=travelers-in-egypt&utm_campaign=oss'
							);
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
				</HStack>
			</Flex>
		</Box>
	);
};
