import { As, ChakraComponent, ChakraProps, StackProps } from "@chakra-ui/react";

export interface CmsComponentBase<
  ComponentProps extends ChakraProps
> extends ChakraComponent<As, ComponentProps> {
  children: React.ReactNode,
  props: ComponentProps
}

export type CmsStackProps = CmsComponentBase<StackProps>