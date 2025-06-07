import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

type SliderWithInputProps = {
   value: number
   onChange: (value: number) => void
   min: number
   max: number
   step?: number
   label: string
   unit?: string
}

const SliderWithInput = ({
   value,
   onChange,
   min,
   max,
   step = 1,
   label,
   unit = 'px',
}: SliderWithInputProps) => {
   // States
   const [localValue, setLocalValue] = useState(value)

   useEffect(() => {
      setLocalValue(value)
   }, [value])

   return (
      <div className="mb-3">
         <div className="mb-1.5 flex items-center justify-between">
            <Label
               className="text-md font-medium"
               htmlFor={`slider-${label.replace(/\s+/g, '-').toLowerCase()}`}
            >
               {label}
            </Label>
            <div className="flex items-center gap-1">
               <Input
                  className="h-6 w-18 px-2 text-xs"
                  id={`input-${label.replace(/\s+/g, '-').toLowerCase()}`}
                  max={max}
                  min={min}
                  onChange={(e) => {
                     const newValue = Number(e.target.value)

                     setLocalValue(newValue)
                     onChange(newValue)
                  }}
                  step={step}
                  type="number"
                  value={localValue}
               />
               <span className="text-muted-foreground text-xs">{unit}</span>
            </div>
         </div>
         <Slider
            className="py-1"
            id={`slider-${label.replace(/\s+/g, '-').toLowerCase()}`}
            max={max}
            min={min}
            onValueChange={(values) => {
               setLocalValue(values[0])
               onChange(values[0])
            }}
            step={step}
            value={[localValue]}
         />
      </div>
   )
}

export default SliderWithInput
