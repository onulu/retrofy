import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { SheetTrigger } from '../ui/sheet'
import GenerateButton from './GenerateButton'
import ImageUploader from './ImageUploader'
import ModelSelector from './ModelSelector'
import ParameterSelector from './ParameterSelector'
import CommonSelector from './CommonSelector'

const MobileDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="initial md:hidden">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="pb-4 w-full max-h-[86dvh] overflow-y-scroll rounded-2xl"
      >
        <SheetHeader className="mb-4">
          <SheetTitle>Configuration</SheetTitle>
          <SheetDescription>
            Configure the settings for the model.
          </SheetDescription>
        </SheetHeader>
        <div className="">
          <div className="grid gap-2">
            <ImageUploader />
            <ModelSelector />
            <ParameterSelector />
            <CommonSelector />
          </div>
          <div className="px-3">
            <SheetClose asChild>
              <GenerateButton />
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileDrawer
