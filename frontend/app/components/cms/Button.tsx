import { Button, ComponentDefaultProps } from "@chakra-ui/react"

interface EditableButtonProps extends ComponentDefaultProps { }

export const EditableButton = ({ children }: EditableButtonProps) => {
  return (
    <Button>
      {children}
    </Button>
  )
}