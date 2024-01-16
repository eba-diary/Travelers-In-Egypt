import { Stack, StackProps } from "@chakra-ui/react"
import { CmsComponentBase, CmsStackProps } from "./types"

interface EditableStackProps extends CmsComponentBase<StackProps> { }

export const EditableStack = ({ children, props }: CmsStackProps) => {
  return (
    <Stack
      {...props}
    >
      {children}
    </Stack>
  )
}