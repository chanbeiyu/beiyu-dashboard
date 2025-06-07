'use client'

import * as React from 'react'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu'
import {
   useLineHeightDropdownMenu,
   useLineHeightDropdownMenuState,
} from '@udecode/plate-line-height/react'
import { CheckIcon, WrapText } from 'lucide-react'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ToolbarButton } from './toolbar'

export function LineHeightDropdownMenu({ ...props }: DropdownMenuProps) {
   const [open, setOpen] = React.useState(false)
   const state = useLineHeightDropdownMenuState()
   const { radioGroupProps } = useLineHeightDropdownMenu(state)

   return (
      <DropdownMenu modal={false} onOpenChange={setOpen} open={open} {...props}>
         <DropdownMenuTrigger asChild>
            <ToolbarButton isDropdown pressed={open} tooltip="Line height">
               <WrapText />
            </ToolbarButton>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="start" className="min-w-0">
            <DropdownMenuRadioGroup {...radioGroupProps}>
               {state.values.map((_value) => (
                  <DropdownMenuRadioItem
                     className="min-w-[180px] pl-2 *:first:[span]:hidden"
                     key={_value}
                     value={_value}
                  >
                     <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
                        <DropdownMenuItemIndicator>
                           <CheckIcon />
                        </DropdownMenuItemIndicator>
                     </span>
                     {_value}
                  </DropdownMenuRadioItem>
               ))}
            </DropdownMenuRadioGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
