import { ChakraProps, StyleProps } from "@chakra-ui/react";

export interface CmsComponentBase<ComponentProps extends StyleProps> extends ChakraProps {
  children?: React.ReactNode;
}

// import { ChakraProps, StyleProps } from "@chakra-ui/react";

// export type CmsComponentBase<ComponentProps extends StyleProps> = {
//   [key in keyof ComponentProps]: ComponentProps;
// } & {
//   children?: React.ReactNode;
// };