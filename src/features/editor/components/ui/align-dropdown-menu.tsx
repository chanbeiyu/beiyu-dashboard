'use client'

import * as React from 'react'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { type Alignment, setAlign } from '@udecode/plate-alignment'
import { useEditorRef, useSelectionFragmentProp } from '@udecode/plate/react'
import {
   AlignCenterIcon,
   AlignJustifyIcon,
   AlignLeftIcon,
   AlignRightIcon,
} from 'lucide-react'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ToolbarButton } from './toolbar'
import { STRUCTURAL_TYPES } from './transforms'

const items = [
   {
      icon: AlignLeftIcon,
      value: 'left',
   },
   {
      icon: AlignCenterIcon,
      value: 'center',
   },
   {
      icon: AlignRightIcon,
      value: 'right',
   },
   {
      icon: AlignJustifyIcon,
      value: 'justify',
   },
]

export function AlignDropdownMenu(props: DropdownMenuProps) {
   const editor = useEditorRef()
   const value = useSelectionFragmentProp({
      defaultValue: 'start',
      structuralTypes: STRUCTURAL_TYPES,
      getProp: (node) => node.align,
   })

   const [open, setOpen] = React.useState(false)
   const IconValue
    = items.find((item) => item.value === value)?.icon ?? AlignLeftIcon

   return (
      <DropdownMenu modal={false} onOpenChange={setOpen} open={open} {...props}>
         <DropdownMenuTrigger asChild>
            <ToolbarButton isDropdown pressed={open} tooltip="Align">
               <IconValue />
            </ToolbarButton>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="start" className="min-w-0">
            <DropdownMenuRadioGroup
               onValueChange={(value) => {
                  setAlign(editor, { value: value as Alignment })
                  editor.tf.focus()
               }}
               value={value}
            >
               {items.map(({ icon: Icon, value: itemValue }) => (
                  <DropdownMenuRadioItem
                     className="pl-2 *:first:[span]:hidden"
                     key={itemValue}
                     value={itemValue}
                  >
                     <Icon />
                  </DropdownMenuRadioItem>
               ))}
            </DropdownMenuRadioGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
