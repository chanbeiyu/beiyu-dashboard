import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import SliderWithInput from './slider-with-input'
import { ColorSwatch } from './theme-color-panel'

type ShadowControlProps = {
   shadowColor: string
   shadowOpacity: number
   shadowBlur: number
   shadowSpread: number
   shadowOffsetX: number
   shadowOffsetY: number
   onChange: (key: string, value: any) => void
}

const ShadowControl = (props: ShadowControlProps) => {
   // Props
   const {
      shadowColor,
      shadowOpacity,
      shadowBlur,
      shadowSpread,
      shadowOffsetX,
      shadowOffsetY,
      onChange,
   } = props

   return (
      <Accordion collapsible defaultValue="shadow" type="single">
         <AccordionItem className="rounded-lg !border px-4" value="shadow">
            <AccordionTrigger className="cursor-pointer py-3 text-base font-medium">
               Shadow
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2 pb-4">
               <div className="space-y-4">
                  <div>
                     <ColorSwatch
                        label="Shadow Color"
                        onChange={(color) => onChange('shadow-color', color)}
                        value={shadowColor}
                     />
                  </div>

                  <div>
                     <SliderWithInput
                        label="Shadow Opacity"
                        max={1}
                        min={0}
                        onChange={(value) => onChange('shadow-opacity', value)}
                        step={0.01}
                        unit=""
                        value={shadowOpacity}
                     />
                  </div>

                  <div>
                     <SliderWithInput
                        label="Blur Radius"
                        max={50}
                        min={0}
                        onChange={(value) => onChange('shadow-blur', value)}
                        step={0.5}
                        unit="px"
                        value={shadowBlur}
                     />
                  </div>

                  <div>
                     <SliderWithInput
                        label="Spread"
                        max={50}
                        min={-50}
                        onChange={(value) => onChange('shadow-spread', value)}
                        step={0.5}
                        unit="px"
                        value={shadowSpread}
                     />
                  </div>

                  <div>
                     <SliderWithInput
                        label="Offset X"
                        max={50}
                        min={-50}
                        onChange={(value) => onChange('shadow-offset-x', value)}
                        step={0.5}
                        unit="px"
                        value={shadowOffsetX}
                     />
                  </div>

                  <div>
                     <SliderWithInput
                        label="Offset Y"
                        max={50}
                        min={-50}
                        onChange={(value) => onChange('shadow-offset-y', value)}
                        step={0.5}
                        unit="px"
                        value={shadowOffsetY}
                     />
                  </div>
               </div>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}

export default ShadowControl
