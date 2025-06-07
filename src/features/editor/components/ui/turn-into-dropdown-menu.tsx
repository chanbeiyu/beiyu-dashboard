'use client'

import * as React from 'react'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { TElement } from '@udecode/plate'

import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu'
import { BlockquotePlugin } from '@udecode/plate-block-quote/react'
import { CodeBlockPlugin } from '@udecode/plate-code-block/react'
import { HEADING_KEYS } from '@udecode/plate-heading'
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list'
import { TogglePlugin } from '@udecode/plate-toggle/react'
import {
   ParagraphPlugin,
   useEditorRef,
   useSelectionFragmentProp,
} from '@udecode/plate/react'
import {
   CheckIcon,
   ChevronRightIcon,
   Columns3Icon,
   FileCodeIcon,
   Heading1Icon,
   Heading2Icon,
   Heading3Icon,
   ListIcon,
   ListOrderedIcon,
   PilcrowIcon,
   QuoteIcon,
   SquareIcon,
} from 'lucide-react'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuRadioItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ToolbarButton, ToolbarMenuGroup } from './toolbar'
import {
   getBlockType,
   setBlockType,
   STRUCTURAL_TYPES,
} from './transforms'

const turnIntoItems = [
   {
      icon: <PilcrowIcon />,
      keywords: ['paragraph'],
      label: 'Text',
      value: ParagraphPlugin.key,
   },
   {
      icon: <Heading1Icon />,
      keywords: ['title', 'h1'],
      label: 'Heading 1',
      value: HEADING_KEYS.h1,
   },
   {
      icon: <Heading2Icon />,
      keywords: ['subtitle', 'h2'],
      label: 'Heading 2',
      value: HEADING_KEYS.h2,
   },
   {
      icon: <Heading3Icon />,
      keywords: ['subtitle', 'h3'],
      label: 'Heading 3',
      value: HEADING_KEYS.h3,
   },
   {
      icon: <ListIcon />,
      keywords: ['unordered', 'ul', '-'],
      label: 'Bulleted list',
      value: ListStyleType.Disc,
   },
   {
      icon: <ListOrderedIcon />,
      keywords: ['ordered', 'ol', '1'],
      label: 'Numbered list',
      value: ListStyleType.Decimal,
   },
   {
      icon: <SquareIcon />,
      keywords: ['checklist', 'task', 'checkbox', '[]'],
      label: 'To-do list',
      value: INDENT_LIST_KEYS.todo,
   },
   {
      icon: <ChevronRightIcon />,
      keywords: ['collapsible', 'expandable'],
      label: 'Toggle list',
      value: TogglePlugin.key,
   },
   {
      icon: <FileCodeIcon />,
      keywords: ['```'],
      label: 'Code',
      value: CodeBlockPlugin.key,
   },
   {
      icon: <QuoteIcon />,
      keywords: ['citation', 'blockquote', '>'],
      label: 'Quote',
      value: BlockquotePlugin.key,
   },
   {
      icon: <Columns3Icon />,
      label: '3 columns',
      value: 'action_three_columns',
   },
]

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
   const editor = useEditorRef()
   const [open, setOpen] = React.useState(false)

   const value = useSelectionFragmentProp({
      defaultValue: ParagraphPlugin.key,
      structuralTypes: STRUCTURAL_TYPES,
      getProp: (node) => getBlockType(node as TElement),
   })
   const selectedItem = React.useMemo(
      () =>
         turnIntoItems.find(
            (item) => item.value === (value ?? ParagraphPlugin.key),
         ) ?? turnIntoItems[0],
      [value],
   )

   return (
      <DropdownMenu modal={false} onOpenChange={setOpen} open={open} {...props}>
         <DropdownMenuTrigger asChild>
            <ToolbarButton
               className="min-w-[125px]"
               isDropdown
               pressed={open}
               tooltip="Turn into"
            >
               {selectedItem.label}
            </ToolbarButton>
         </DropdownMenuTrigger>

         <DropdownMenuContent
            align="start"
            className="ignore-click-outside/toolbar min-w-0"
            onCloseAutoFocus={(e) => {
               e.preventDefault()
               editor.tf.focus()
            }}
         >
            <ToolbarMenuGroup
               label="Turn into"
               onValueChange={(type) => {
                  setBlockType(editor, type)
               }}
               value={value}
            >
               {turnIntoItems.map(({ icon, label, value: itemValue }) => (
                  <DropdownMenuRadioItem
                     className="min-w-[180px] pl-2 *:first:[span]:hidden"
                     key={itemValue}
                     value={itemValue}
                  >
                     <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
                        <DropdownMenuItemIndicator>
                           <CheckIcon />
                        </DropdownMenuItemIndicator>
                     </span>
                     {icon}
                     {label}
                  </DropdownMenuRadioItem>
               ))}
            </ToolbarMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
