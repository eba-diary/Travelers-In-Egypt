import { useEffect } from "react"

interface BindShortcutProps {
  event: ((event: KeyboardEvent) => void)[]
}

export const useBindKeyboardShortcut = ({
  event
}: BindShortcutProps): void => {
  useEffect(() => {
    for (let i = 0; i < event.length; i++) {
      window.addEventListener("keydown", event[i])
    }

    return () => {
      for (let i = 0; i < event.length; i++) {
        window.removeEventListener("keydown", event[i])
      }
    }

  }, [])
}