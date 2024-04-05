import { Button, ButtonProps, ComponentDefaultProps } from "@chakra-ui/react"
import { CmsComponentBase } from "../types"

interface EditableButtonProps extends CmsComponentBase<ButtonProps> { }

export const EditableButton = ({ children, props }: EditableButtonProps) => {

  return (
    <Button
      {...props}
    >
      {children}
    </Button>
  )
}