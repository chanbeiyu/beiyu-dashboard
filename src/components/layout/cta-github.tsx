import React from 'react'

import { Github } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function CtaGithub() {
   return (
      <Button asChild className="hidden sm:flex" size="sm" variant="ghost">
         <a
            className="dark:text-foreground"
            href="https://github.com/Kiranism/next-shadcn-dashboard-starter"
            rel="noopener noreferrer"
            target="_blank"
         >
            <Github />
         </a>
      </Button>
   )
}
