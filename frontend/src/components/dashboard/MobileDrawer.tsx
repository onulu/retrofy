import { Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import ModelMenu from './ModelMenu'
import { SheetTrigger } from '../ui/sheet'

const MobileDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Settings className="size-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="pb-4 w-[400px] sm:w-[540px] max-h-screen overflow-y-scroll"
      >
        <SheetHeader className="mb-4">
          <SheetTitle>Configuration</SheetTitle>
          <SheetDescription>
            Configure the settings for the model.
          </SheetDescription>
        </SheetHeader>
        <ModelMenu />
      </SheetContent>
    </Sheet>
  )
}

export default MobileDrawer
