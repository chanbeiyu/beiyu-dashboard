'use client'

import { Github } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function GithubSignInButton() {
   const searchParams = useSearchParams()
   const callbackUrl = searchParams.get('callbackUrl')

   return (
      <Button
         className="w-full"
         onClick={() => console.log('continue with github clicked')}
         type="button"
         variant="outline"
      >
         <Github className="mr-2 h-4 w-4" />
         Continue with Github
      </Button>
   )
}
