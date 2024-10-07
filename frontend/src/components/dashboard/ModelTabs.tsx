import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'

import DitheringSelector from './DitheringSelector'

const ModelTabs = () => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <h2 className="font-medium mb-4">Select a Model</h2>
      <TabsList>
        <TabsTrigger value="dithering">Dithering</TabsTrigger>
        <TabsTrigger value="glitch">VHS Glitch</TabsTrigger>
        <TabsTrigger value="halftone">Halftone</TabsTrigger>
      </TabsList>
      <TabsContent
        value="dithering"
        className="bg-secondary rounded-lg h-full w-full p-4"
      >
        <DitheringSelector />
      </TabsContent>
      <TabsContent value="glitch">Glitch Glitch</TabsContent>
    </Tabs>
  )
}

export default ModelTabs
