'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ThemeThumbnail } from '@/components/theme/theme-thumbnail'
import { Button } from '@/components/ui/button'
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

import { useUITheme } from '@/contexts/ui-theme-context'
import { showSubmittedData } from '@/utils/show-submitted-data'

const appearanceFormSchema = z.object({
   theme: z.enum(['light', 'dark'], {
      required_error: 'Please select a theme.',
   }),
   // font: z.enum(fonts, {
   //   invalid_type_error: 'Select a font',
   //   required_error: 'Please select a font.',
   // }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm() {
   // const { font, setFont } = useFont()
   const { theme, setTheme } = useUITheme()

   // This can come from your database or API.
   const defaultValues: Partial<AppearanceFormValues> = {
      theme: theme as 'light' | 'dark',
      // font,
   }

   const form = useForm<AppearanceFormValues>({
      resolver: zodResolver(appearanceFormSchema),
      defaultValues,
   })

   function onSubmit(data: AppearanceFormValues) {
      // if (data.font != font) setFont(data.font)
      if (data.theme != theme) setTheme(data.theme as 'light' | 'dark')

      showSubmittedData(data)
   }

   return (
      <Form {...form}>
         <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* <FormField */}
            {/*  control={form.control} */}
            {/*  name='font' */}
            {/*  render={({ field }) => ( */}
            {/*    <FormItem> */}
            {/*      <FormLabel>Font</FormLabel> */}
            {/*      <div className='relative w-max'> */}
            {/*        <FormControl> */}
            {/*          <select */}
            {/*            className={cn( */}
            {/*              buttonVariants({ variant: 'outline' }), */}
            {/*              'w-[200px] appearance-none font-normal capitalize' */}
            {/*            )} */}
            {/*            {...field} */}
            {/*          > */}
            {/*            {fonts.map((font) => ( */}
            {/*              <option key={font} value={font}> */}
            {/*                {font} */}
            {/*              </option> */}
            {/*            ))} */}
            {/*          </select> */}
            {/*        </FormControl> */}
            {/*        <ChevronDownIcon className='absolute top-2.5 right-3 h-4 w-4 opacity-50' /> */}
            {/*      </div> */}
            {/*      <FormDescription className='font-manrope'> */}
            {/*        Set the font you want to use in the dashboard. */}
            {/*      </FormDescription> */}
            {/*      <FormMessage /> */}
            {/*    </FormItem> */}
            {/*  )} */}
            {/* /> */}
            <FormField
               control={form.control}
               name="theme"
               render={({ field }) => (
                  <FormItem className="space-y-1">
                     <FormLabel>Theme</FormLabel>
                     <FormDescription>
                        Select the theme for the dashboard.
                     </FormDescription>
                     <FormMessage />
                     <RadioGroup
                        className="grid max-w-md grid-cols-2 gap-8 pt-2"
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                     >
                        <FormItem>
                           <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <FormControl>
                                 <RadioGroupItem className="sr-only" value="light" />
                              </FormControl>
                              <ThemeThumbnail mode="light" />
                              <span className="block w-full p-2 text-center font-normal">
                                 Light
                              </span>
                           </FormLabel>
                        </FormItem>
                        <FormItem>
                           <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <FormControl>
                                 <RadioGroupItem className="sr-only" value="dark" />
                              </FormControl>
                              <ThemeThumbnail mode="dark" />
                              <span className="block w-full p-2 text-center font-normal">
                                 Dark
                              </span>
                           </FormLabel>
                        </FormItem>
                     </RadioGroup>
                  </FormItem>
               )}
            />

            <Button type="submit">Update preferences</Button>
         </form>
      </Form>
   )
}
