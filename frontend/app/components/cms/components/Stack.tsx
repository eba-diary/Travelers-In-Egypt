import { Stack, StackProps } from "@chakra-ui/react"
import { CmsStackProps } from "../types"


export const EditableStack = ({ children, props }: CmsStackProps) => {

  return (
    <Stack
      {...props}
    >
      {children}
    </Stack>
  )
}