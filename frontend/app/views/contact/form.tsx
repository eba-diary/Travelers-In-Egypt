// ContactForm.tsx
import React, { useMemo } from 'react';
import { useForm, SubmitHandler, FormProvider, Form } from 'react-hook-form';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
	FormErrorMessage,
	Grid,
	GridItem,
	Stack,
	HStack,
	useToast,
} from '@chakra-ui/react';
import { validate } from 'email-validator';
import { COMPONENT_PADDING, GRAY, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from '../../components/styles.config';
import FormFieldWrapper from '../../components/form';

interface ContactFormValues {
	firstName: string;
	lastName: string;
	email: string;
	subject: string;
	comments: string;
}

const defaultValues: ContactFormValues = {
	firstName: '',
	lastName: '',
	email: '',
	subject: '',
	comments: '',
};

interface ContactFormProps {
	backgroundColor: "primary" | "secondary"
}
export const ContactForm = ({
	backgroundColor
}: ContactFormProps) => {
	const { control, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
		defaultValues
	});

	const toast = useToast();

	const _backgroundColor = useMemo(() => (
		backgroundColor === "primary" ? SECONDARY_BG_COLOR : WHITE
	), [backgroundColor])

	const onSubmit: SubmitHandler<ContactFormValues> = data => {
		/** to be used with emailJs */
		console.log(data);
		reset();
		toast({
			duration: 3000,
			isClosable: true,
			status: "success",
			title: "Your message was received!"
		})
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack
				width="100%"
				backgroundColor={_backgroundColor}
				padding={COMPONENT_PADDING}
				alignItems="center"
			>
				<Stack
					width={{ base: "full", md: "3xl", lg: "4xl", xl: "7xl" }}
				>
					<Stack
						bg={PRIMARY_BG_COLOR}
						p={4}
					>
						<HStack>
							<FormFieldWrapper
								control={control}
								name="firstName"
								label='First Name'
								rules={{
									validate: (data) => {
										if (!data.length) {
											return "Must enter a name"
										};
									}
								}}
							>
								{(({ value, onChange }) => (
									<Input
										border="none"
										bgColor={WHITE}
										value={value}
										onChange={onChange}
									/>
								))}
							</FormFieldWrapper>
							<FormFieldWrapper
								control={control}
								name="lastName"
								label='Last Name'
								rules={{
									validate: (data) => {
										if (!data.length) {
											return "Must enter a value"
										};
									}
								}}
							>
								{(({ value, onChange }) => (
									<Input
										border="none"
										bgColor={WHITE}
										value={value}
										onChange={onChange}
									/>
								))}
							</FormFieldWrapper>
						</HStack>
						<FormFieldWrapper
							control={control}
							name="email"
							label='Email Address'
							rules={{
								validate: (data) => {
									if (!validate(data) || data.length === 0) {
										return "Invalid email address"
									};
								}
							}}
						>
							{(({ value, onChange }) => (
								<Input
									border="none"
									bgColor={WHITE}
									value={value}
									onChange={onChange}
								/>
							))}
						</FormFieldWrapper>
						<FormFieldWrapper
							control={control}
							name="subject"
							label='Subject'
						>
							{(({ value, onChange }) => (
								<Input
									border="none"
									bgColor={WHITE}
									value={value}
									onChange={onChange}
								/>
							))}
						</FormFieldWrapper>
						<FormFieldWrapper
							control={control}
							name="comments"
							label='Comments'
						>
							{(({ value, onChange }) => (
								<Textarea
									border="none"
									bgColor={WHITE}
									value={value}
									onChange={onChange}
								/>
							))}
						</FormFieldWrapper>
						<Button
							type="submit"
							aria-label='Submit'
							bgColor={GRAY}
							color={WHITE}
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</form>
	);
};