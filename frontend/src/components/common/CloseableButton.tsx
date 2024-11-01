import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'
import { forwardRef } from 'react'
import { ButtonProps } from '@/components/ui/button'

interface CloseableButtonProps extends ButtonProps {
  children: React.ReactNode
}

const CloseableButton = forwardRef<HTMLButtonElement, CloseableButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <SheetClose asChild>
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </SheetClose>
    )
  }
)

CloseableButton.displayName = 'CloseableButton'

export default CloseableButton
