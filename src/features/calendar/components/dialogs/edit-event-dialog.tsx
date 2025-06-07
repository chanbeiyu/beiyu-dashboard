'use client'

import type { TimeValue } from 'react-aria-components'

import { zodResolver } from '@hookform/resolvers/zod'
import { parseISO } from 'date-fns'
import { useForm } from 'react-hook-form'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import type { IEvent } from '../../types/interfaces'
import type { TEventFormData } from '../../types/schemas'

import { useCalendar } from '../../contexts/calendar-context'
import { useDisclosure } from '../../hooks/use-disclosure'
import { useUpdateEvent } from '../../hooks/use-update-event'
import { eventSchema } from '../../types/schemas'
import { SingleDayPicker } from '../single-day-picker'
import { TimeInput } from '../time-input'

interface IProps {
   children: React.ReactNode
   event: IEvent
}

export function EditEventDialog({ children, event }: IProps) {
   const { isOpen, onClose, onToggle } = useDisclosure()

   const { users } = useCalendar()

   const { updateEvent } = useUpdateEvent()

   const form = useForm<TEventFormData>({
      resolver: zodResolver(eventSchema),
      defaultValues: {
         user: event.user.id,
         title: event.title,
         description: event.description,
         startDate: parseISO(event.startDate),
         startTime: { hour: parseISO(event.startDate).getHours(), minute: parseISO(event.startDate).getMinutes() },
         endDate: parseISO(event.endDate),
         endTime: { hour: parseISO(event.endDate).getHours(), minute: parseISO(event.endDate).getMinutes() },
         color: event.color,
      },
   })

   const onSubmit = (values: TEventFormData) => {
      const user = users.find((user) => user.id === values.user)

      if (!user) throw new Error('User not found')

      const startDateTime = new Date(values.startDate)
      startDateTime.setHours(values.startTime.hour, values.startTime.minute)

      const endDateTime = new Date(values.endDate)
      endDateTime.setHours(values.endTime.hour, values.endTime.minute)

      updateEvent({
         ...event,
         user,
         title: values.title,
         color: values.color,
         description: values.description,
         startDate: startDateTime.toISOString(),
         endDate: endDateTime.toISOString(),
      })

      onClose()
   }

   return (
      <Dialog onOpenChange={onToggle} open={isOpen}>
         <DialogTrigger asChild>{children}</DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Edit Event</DialogTitle>
               <DialogDescription>
                  This is just and example of how to use the form. In a real application, you would call the API to update the event
               </DialogDescription>
            </DialogHeader>

            <Form {...form}>
               <form className="grid gap-4 py-4" id="event-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                     control={form.control}
                     name="user"
                     render={({ field, fieldState }) => (
                        <FormItem>
                           <FormLabel>Responsible</FormLabel>
                           <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                 <SelectTrigger data-invalid={fieldState.invalid}>
                                    <SelectValue placeholder="Select an option" />
                                 </SelectTrigger>

                                 <SelectContent>
                                    {users.map((user) => (
                                       <SelectItem className="flex-1" key={user.id} value={user.id}>
                                          <div className="flex items-center gap-2">
                                             <Avatar className="size-6" key={user.id}>
                                                <AvatarImage alt={user.name} src={user.picturePath ?? undefined} />
                                                <AvatarFallback className="text-xxs">{user.name[0]}</AvatarFallback>
                                             </Avatar>

                                             <p className="truncate">{user.name}</p>
                                          </div>
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field, fieldState }) => (
                        <FormItem>
                           <FormLabel htmlFor="title">Title</FormLabel>

                           <FormControl>
                              <Input data-invalid={fieldState.invalid} id="title" placeholder="Enter a title" {...field} />
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className="flex items-start gap-2">
                     <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field, fieldState }) => (
                           <FormItem className="flex-1">
                              <FormLabel htmlFor="startDate">Start Date</FormLabel>

                              <FormControl>
                                 <SingleDayPicker
                                    data-invalid={fieldState.invalid}
                                    id="startDate"
                                    onSelect={(date) => field.onChange(date as Date)}
                                    placeholder="Select a date"
                                    value={field.value}
                                 />
                              </FormControl>

                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field, fieldState }) => (
                           <FormItem className="flex-1">
                              <FormLabel>Start Time</FormLabel>

                              <FormControl>
                                 <TimeInput data-invalid={fieldState.invalid} hourCycle={12} onChange={field.onChange} value={field.value as TimeValue} />
                              </FormControl>

                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <div className="flex items-start gap-2">
                     <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field, fieldState }) => (
                           <FormItem className="flex-1">
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                 <SingleDayPicker
                                    data-invalid={fieldState.invalid}
                                    onSelect={(date) => field.onChange(date as Date)}
                                    placeholder="Select a date"
                                    value={field.value}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field, fieldState }) => (
                           <FormItem className="flex-1">
                              <FormLabel>End Time</FormLabel>
                              <FormControl>
                                 <TimeInput data-invalid={fieldState.invalid} hourCycle={12} onChange={field.onChange} value={field.value as TimeValue} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={form.control}
                     name="color"
                     render={({ field, fieldState }) => (
                        <FormItem>
                           <FormLabel>Color</FormLabel>
                           <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                 <SelectTrigger data-invalid={fieldState.invalid}>
                                    <SelectValue placeholder="Select an option" />
                                 </SelectTrigger>

                                 <SelectContent>
                                    <SelectItem value="blue">
                                       <div className="flex items-center gap-2">
                                          <div className="size-3.5 rounded-full bg-blue-600" />
                                          Blue
                                       </div>
                                    </SelectItem>

                                    <SelectItem value="green">
                                       <div className="flex items-center gap-2">
                                          <div className="size-3.5 rounded-full bg-green-600" />
                                          Green
                                       </div>
                                    </SelectItem>

                                    <SelectItem value="red">
                                       <div className="flex items-center gap-2">
                                          <div className="size-3.5 rounded-full bg-red-600" />
                                          Red
                                       </div>
                                    </SelectItem>

                                    <SelectItem value="yellow">
                                       <div className="flex items-center gap-2">
                                          <div className="size-3.5 rounded-full bg-yellow-600" />
                                          Yellow
                                       </div>
                                    </SelectItem>

                                    <SelectItem value="purple">
                                       <div className="flex items-center gap-2">
                                          <div className="size-3.5 rounded-full bg-purple-600" />
                                          Purple
                                       </div>
                                    </SelectItem>

                                    <SelectItem value="orange">
                                       <div className="flex items-center gap-2">
                                          <div className="size-3.5 rounded-full bg-orange-600" />
                                          Orange
                                       </div>
                                    </SelectItem>

                                    <SelectItem value="gray">
                                       <div className="flex items-center gap-2">
                                          <div className="size-3.5 rounded-full bg-neutral-600" />
                                          Gray
                                       </div>
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field, fieldState }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>

                           <FormControl>
                              <Textarea {...field} data-invalid={fieldState.invalid} value={field.value} />
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </form>
            </Form>

            <DialogFooter>
               <DialogClose asChild>
                  <Button type="button" variant="outline">
                     Cancel
                  </Button>
               </DialogClose>

               <Button form="event-form" type="submit">
                  Save changes
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
