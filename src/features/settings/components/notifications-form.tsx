'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

import { notificationsFormSchema, NotificationsFormValues } from '@/features/settings'
import { showSubmittedData } from '@/utils/show-submitted-data'

export function NotificationsForm({ notifications }: { notifications: Promise<NotificationsFormValues> }) {
   const defaultValues = React.use(notifications)

   const form = useForm<NotificationsFormValues>({
      resolver: zodResolver(notificationsFormSchema),
      defaultValues,
   })

   return (
      <Form {...form}>
         <form
            className="space-y-8"
            onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
         >
            <FormField
               control={form.control}
               name="type"
               render={({ field }) => (
                  <FormItem className="relative space-y-3">
                     <FormLabel>Notify me about...</FormLabel>
                     <FormControl>
                        <RadioGroup
                           className="flex flex-col space-y-1"
                           defaultValue={field.value}
                           onValueChange={field.onChange}
                        >
                           <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                 <RadioGroupItem value="all" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                 All new messages
                              </FormLabel>
                           </FormItem>
                           <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                 <RadioGroupItem value="mentions" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                 Direct messages and mentions
                              </FormLabel>
                           </FormItem>
                           <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                 <RadioGroupItem value="none" />
                              </FormControl>
                              <FormLabel className="font-normal">Nothing</FormLabel>
                           </FormItem>
                        </RadioGroup>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="relative">
               <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="communication_emails"
                     render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                           <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                 Communication emails
                              </FormLabel>
                              <FormDescription>
                                 Receive emails about your account activity.
                              </FormDescription>
                           </div>
                           <FormControl>
                              <Switch
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="marketing_emails"
                     render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                           <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                 Marketing emails
                              </FormLabel>
                              <FormDescription>
                                 Receive emails about new products, features, and more.
                              </FormDescription>
                           </div>
                           <FormControl>
                              <Switch
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="social_emails"
                     render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                           <div className="space-y-0.5">
                              <FormLabel className="text-base">Social emails</FormLabel>
                              <FormDescription>
                                 Receive emails for friend requests, follows, and more.
                              </FormDescription>
                           </div>
                           <FormControl>
                              <Switch
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="security_emails"
                     render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                           <div className="space-y-0.5">
                              <FormLabel className="text-base">Security emails</FormLabel>
                              <FormDescription>
                                 Receive emails about your account activity and security.
                              </FormDescription>
                           </div>
                           <FormControl>
                              <Switch
                                 aria-readonly
                                 checked={field.value}
                                 disabled
                                 onCheckedChange={field.onChange}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
               </div>
            </div>
            <FormField
               control={form.control}
               name="mobile"
               render={({ field }) => (
                  <FormItem className="relative flex flex-row items-start space-y-0 space-x-3">
                     <FormControl>
                        <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                        />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <FormLabel>
                           Use different settings for my mobile devices
                        </FormLabel>
                        <FormDescription>
                           You can manage your mobile notifications in the
                           {' '}
                           <Link
                              className="underline decoration-dashed underline-offset-4 hover:decoration-solid"
                              href="/dashboard/settings"
                           >
                              mobile settings
                           </Link>
                           {' '}
                           page.
                        </FormDescription>
                     </div>
                  </FormItem>
               )}
            />
            <Button type="submit">Update notifications</Button>
         </form>
      </Form>
   )
}
