import React from 'react'

import { Icon, IconifyIconProps } from '@iconify-icon/react'
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic'

export const IconX = ({
   icon,
   size = 24,
   className = '',
   color,
}: IconifyIconProps) => {
   function isLucideName(value: any): value is IconName {
      return iconNames.includes(value)
   }

   if (isLucideName(icon)) {
      return (
         <DynamicIcon
            className={className}
            color={color}
            name={icon}
            size={size}
         />
      )
   }
   return (
      <Icon
         aria-hidden="true"
         className={className}
         color={color}
         icon={icon}
         size={size}
      />
   )
}
