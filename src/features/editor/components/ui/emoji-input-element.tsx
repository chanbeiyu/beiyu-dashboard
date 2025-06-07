'use client'

import * as React from 'react'

import type { PlateElementProps } from '@udecode/plate/react'

import { EmojiInlineIndexSearch, insertEmoji } from '@udecode/plate-emoji'
import { EmojiPlugin } from '@udecode/plate-emoji/react'
import { PlateElement, usePluginOption } from '@udecode/plate/react'

import { useDebounce } from '@/hooks/use-debounce'

import {
   InlineCombobox,
   InlineComboboxContent,
   InlineComboboxEmpty,
   InlineComboboxGroup,
   InlineComboboxInput,
   InlineComboboxItem,
} from './inline-combobox'

export function EmojiInputElement(props: PlateElementProps) {
   const { children, editor, element } = props
   const data = usePluginOption(EmojiPlugin, 'data')!
   const [value, setValue] = React.useState('')
   const [debouncedValue] = useDebounce(value, 100)
   const isPending = value !== debouncedValue

   const filteredEmojis = React.useMemo(() => {
      if (debouncedValue.trim().length === 0) return []

      return EmojiInlineIndexSearch.getInstance(data)
         .search(debouncedValue.replace(/:$/, ''))
         .get()
   }, [data, debouncedValue])

   return (
      <PlateElement as="span" data-slate-value={element.value} {...props}>
         <InlineCombobox
            element={element}
            filter={false}
            hideWhenNoValue
            setValue={setValue}
            trigger=":"
            value={value}
         >
            <InlineComboboxInput />

            <InlineComboboxContent>
               {!isPending && <InlineComboboxEmpty>No results</InlineComboboxEmpty>}

               <InlineComboboxGroup>
                  {filteredEmojis.map((emoji) => (
                     <InlineComboboxItem
                        key={emoji.id}
                        onClick={() => insertEmoji(editor, emoji)}
                        value={emoji.name}
                     >
                        {emoji.skins[0].native}
                        {' '}
                        {emoji.name}
                     </InlineComboboxItem>
                  ))}
               </InlineComboboxGroup>
            </InlineComboboxContent>
         </InlineCombobox>

         {children}
      </PlateElement>
   )
}
