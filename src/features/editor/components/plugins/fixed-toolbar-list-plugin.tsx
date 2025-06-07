'use client'

import { createPlatePlugin } from '@udecode/plate/react'

import { FixedToolbar } from '../ui/fixed-toolbar'
import { FixedToolbarListButtons } from '../ui/fixed-toolbar-list-buttons'

export const FixedToolbarListPlugin = createPlatePlugin({
   key: 'fixed-toolbar',
   render: {
      beforeEditable: () => (
         <FixedToolbar>
            <FixedToolbarListButtons />
         </FixedToolbar>
      ),
   },
})
