import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'

import Layout from '../layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
   return (
      <Layout>
         <Card className="gap-4">
            <CardHeader>
               <CardTitle className="text-lg tracking-tight">Login</CardTitle>
               <CardDescription>
                  Enter your email and password below to
                  {' '}
                  <br />
                  log into your account
               </CardDescription>
            </CardHeader>
            <CardContent>
               <UserAuthForm />
            </CardContent>
            <CardFooter>
               <p className="text-muted-foreground px-8 text-center text-sm">
                  By clicking login, you agree to our
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
