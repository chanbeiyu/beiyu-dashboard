import Link from 'next/link'

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'

import Layout from '../layout'
import { SignUpForm } from './components/sign-up-form'

export default function SignUp() {
   return (
      <Layout>
         <Card className="gap-4">
            <CardHeader>
               <CardTitle className="text-lg tracking-tight">
                  Create an account
               </CardTitle>
               <CardDescription>
                  Enter your email and password to create an account.
                  {' '}
                  <br />
                  Already have an account?
                  {' '}
                  <Link
                     className="hover:text-primary underline underline-offset-4"
                     href="/sign-in"
                  >
                     Sign In
                  </Link>
               </CardDescription>
            </CardHeader>
            <CardContent>
               <SignUpForm />
            </CardContent>
            <CardFooter>
               <p className="text-muted-foreground px-8 text-center text-sm">
                  By creating an account, you agree to our
                  {' '}
                  <a
                     className="hover:text-primary underline underline-offset-4"
                     href="/terms"
                  >
                     Terms of Service
                  </a>
                  {' '}
                  and
                  {' '}
                  <a
                     className="hover:text-primary underline underline-offset-4"
                     href="/privacy"
                  >
                     Privacy Policy
                  </a>
                  .
               </p>
            </CardFooter>
         </Card>
      </Layout>
   )
}
