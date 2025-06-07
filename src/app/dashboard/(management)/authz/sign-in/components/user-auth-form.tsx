import { HTMLAttributes, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Facebook, Github } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
   email: z
      .string()
      .min(1, { message: 'Please enter your email' })
      .email({ message: 'Invalid email address' }),
   password: z
      .string()
      .min(1, {
         message: 'Please enter your password',
      })
      .min(7, {
         message: 'Password must be at least 7 characters long',
      }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
   const [isLoading, setIsLoading] = useState(false)

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })

   function onSubmit(data: z.infer<typeof formSchema>) {
      setIsLoading(true)

      console.log(data)

      setTimeout(() => {
         setIsLoading(false)
      }, 3000)
   }

   return (
      <Form {...form}>
         <form
            className={cn('grid gap-3', className)}
            onSubmit={form.handleSubmit(onSubmit)}
            {...props}
         >
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem className="relative">
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <PasswordInput placeholder="********" {...field} />
                     </FormControl>
                     <FormMessage />
                     <Link
                        className="text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75"
                        href="/forgot-password"
                     >
                        Forgot password?
                     </Link>
                  </FormItem>
               )}
            />
            <Button className="mt-2" disabled={isLoading}>
               Login
            </Button>

            <div className="relative my-2">
               <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                     Or continue with
                  </span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
               <Button disabled={isLoading} type="button" variant="outline">
                  <Github className="h-4 w-4" />
                  {' '}
                  GitHub
               </Button>
               <Button disabled={isLoading} type="button" variant="outline">
                  <Facebook className="h-4 w-4" />
                  {' '}
                  Facebook
               </Button>
            </div>
         </form>
      </Form>
   )
}
