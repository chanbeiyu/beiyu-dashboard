import type { ButtonHTMLAttributes } from 'react'

import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

import { useDisclosure } from '../hooks/use-disclosure'
import { SingleCalendar } from './single-calendar'

// ================================== //

type TProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'value'> & {
   onSelect: (value: Date | undefined) => void
   value?: Date | undefined
   placeholder: string
   labelVariant?: 'P' | 'PP' | 'PPP'
}

function SingleDayPicker({ id, onSelect, className, placeholder, labelVariant = 'PPP', value, ...props }: TProps) {
   const { isOpen, onClose, onToggle } = useDisclosure()

   const handleSelect = (date: Date | undefined) => {
      onSelect(date)
      onClose()
   }

   return (
      <Popover modal onOpenChange={onToggle} open={isOpen}>
         <PopoverTrigger asChild>
            <Button
               className={cn('group relative h-9 w-full justify-start whitespace-nowrap px-3 py-2 font-normal hover:bg-inherit', className)}
               id={id}
               variant="outline"
               {...props}
            >
               {value && <span>{format(value, labelVariant)}</span>}
               {!value && <span className="text-muted-foreground">{placeholder}</span>}
            </Button>
         </PopoverTrigger>

         <PopoverContent align="center" className="w-fit p-0">
            <SingleCalendar initialFocus mode="single" onSelect={handleSelect} selected={value} />
         </PopoverContent>
      </Popover>
   )
}

// ================================== //

export { SingleDayPicker }
