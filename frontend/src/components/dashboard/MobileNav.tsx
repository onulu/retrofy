import { useEffect, useState } from 'react'
import { Download, Settings2, Undo2 } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerDescription,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from '../ui/drawer'
import ImageUploader from './ImageUploader'
import GenerateButton from './GenerateButton'
import CommonSelector from './CommonSelector'
import ModelSelector from './ModelSelector'
import ParameterSelector from './ParameterSelector'

import useStore from '@/store'
import { useMediaQuery } from '@/utils/useMediaQuery'

const MobileNav = () => {
  const enhancedImage = useStore((state) => state.enhancedImage)
  const originalImage = useStore((state) => state.originalImage)
  const resetState = useStore((state) => state.resetState)
  const setIsDrawerOpen = useStore((state) => state.setIsDrawerOpen)
  const isDrawerOpen = useStore((state) => state.isDrawerOpen)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (isDesktop) {
      setIsDrawerOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop])

  return (
    originalImage && (
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-5 
      flex justify-end gap-2 
      border border-foreground/10 
      bg-zinc-900/70 backdrop-blur-sm 
      px-2 py-2
      rounded-full 
      shadow-lg"
      >
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="muted"
              size="sm"
              className="initial md:hidden rounded-full flex items-center justify-center gap-1"
            >
              <Settings2 className="size-4" />
              <p>Settings</p>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-background px-2">
            <DrawerHeader>
              <DrawerTitle>Configuration</DrawerTitle>
              <DrawerDescription>
                Configure the settings for the model.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-2 max-h-[65dvh] overflow-y-auto">
              <ImageUploader />
              <ModelSelector />
              <ParameterSelector />
              <CommonSelector />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <GenerateButton />
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button
          variant="muted"
          size="sm"
          className="rounded-full flex items-center justify-center gap-1"
          onClick={resetState}
        >
          <Undo2 className="size-4" />
          <p>Reset </p>
        </Button>

        {enhancedImage && (
          <Button
            variant="muted"
            size="sm"
            className="rounded-full flex items-center justify-center gap-1"
          >
            <Download className="size-4" />
            <p>Download</p>
          </Button>
        )}
      </div>
    )
  )
}
export default MobileNav
