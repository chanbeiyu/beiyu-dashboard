'use client'
import { useKBar } from 'kbar'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function SearchInput() {
   const { query } = useKBar()
   return (
      <div className="w-full space-y-2">
         <Button
            className="bg-background text-muted-foreground relative h-9 w-20 justify-start rounded-[0.5rem] text-sm font-normal shadow-none sm:pr-12"
            onClick={query.toggle}
            variant="outline"
         >
            <Search className="mr-2 h-4 w-4" />
            {/* Search... */}
            <kbd className="bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-6 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
               <span className="text-xs">⌘</span>
               K
            </kbd>
         </Button>
      </div>
   )
}
