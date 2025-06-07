import { z } from 'zod'

export const profileFormSchema = z.object({
   username: z
      .string()
      .min(2, {
         message: 'Username must be at least 2 characters.',
      })
      .max(30, {
         message: 'Username must not be longer than 30 characters.',
      }),
   email: z
      .string({
         required_error: 'Please select an email to display.',
      })
      .email(),
   bio: z.string().max(160).min(4),
   urls: z
      .array(
         z.object({
            value: z.string().url({ message: 'Please enter a valid URL.' }),
         }),
      )
      .optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

// ---------------------------------------------------------------------------------------------------

export const notificationsFormSchema = z.object({
   type: z.enum(['all', 'mentions', 'none'], {
      required_error: 'You need to select a notification type.',
   }),
   mobile: z.boolean().default(false).optional(),
   communication_emails: z.boolean().default(false).optional(),
   social_emails: z.boolean().default(false).optional(),
   marketing_emails: z.boolean().default(false).optional(),
   security_emails: z.boolean(),
})

export type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

// -------------------------------------------------------------------------------------------------

export const displayFormSchema = z.object({
   items: z.array(
      z.object({
         id: z.string(),
         label: z.string(),
         enabled: z.boolean(),
      }),
   ),
})

export type DisplayFormValues = z.infer<typeof displayFormSchema>
