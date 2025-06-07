'use client'

import { Value } from '@udecode/plate'
import { Plate } from '@udecode/plate-core/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import PageContainer from '@/components/layout/page-container'
import { Heading } from '@/components/ui/heading'

import { editorPlugins } from './plugins/editor-plugins'
import { Editor, EditorContainer } from './ui/editor'
import { useCreateEditor } from './ui/use-create-editor'

const initialValue: Value = [
   {
      type: 'p',
      children: [
         { text: 'Hello! Try out the ' },
         { text: 'bold', bold: true },
         { text: ', ' },
         { text: 'italic', italic: true },
         { text: ', and ' },
         { text: 'underline', underline: true },
         { text: ' formatting.' },
      ],
   },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
   { type: 'p', children: [{ text: ' formatting.' }] },
]

// https://platejs.org/docs
export function PlatejsViewPage() {
   const editor = useCreateEditor({
      plugins: [...editorPlugins],
      value: initialValue,
   })
   return (
      <PageContainer>
         <div className="space-y-4">
            <div className="flex items-start justify-between">
               <Heading description="Rich editor" title="Platejs" />
            </div>
            <DndProvider backend={HTML5Backend}>
               <Plate editor={editor}>
                  <EditorContainer className="h-[calc(100dvh-168px)]" lang="zh-CN" variant="fullWidth">
                     <Editor
                        className="overflow-y-hidden"
                        placeholder="Type your amazing content here..."
                        variant="fullWidth"
                     />
                  </EditorContainer>
               </Plate>
            </DndProvider>
         </div>
      </PageContainer>
   )
}
