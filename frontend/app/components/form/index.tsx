// components/FormFieldWrapper.tsx
import React, { ReactElement } from 'react';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { UseFormRegisterReturn, FieldError, FieldValues, UseControllerProps, Controller, ControllerRenderProps } from 'react-hook-form';
import { ClassNamesArg } from '@emotion/react';

interface FormFieldWrapperProps<
	FV extends FieldValues
> extends UseControllerProps<FV> {
	children: React.FC<ControllerRenderProps<FV>>,
	label: string,
	hiddenLabel?: boolean,
	style?: React.CSSProperties
}

const FormFieldWrapper = <FV extends FieldValues>({
	name,
	control,
	rules,
	label,
	children,
	style,
	hiddenLabel = false }: FormFieldWrapperProps<FV>) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState: { error, invalid } }) => {
				const isInvalid = !!error || !!invalid
				return (
					<FormControl
						isInvalid={isInvalid}
						style={{
							paddingBottom: isInvalid ? "0px" : "1.5rem",
							...style
						}}
					>
						<FormLabel fontWeight={700}>{hiddenLabel ? "" : label} {rules ? <span style={{ color: "red" }}>*</span> : ""}
						</FormLabel>
						{children({
							...field
						})}
						<FormErrorMessage>{error?.message ?? ""}</FormErrorMessage>
					</FormControl>
				)
			}}
		/>
	);
};

export default FormFieldWrapper;
