import { z } from 'zod'

export const overviewSchema = z.object({
   totalRevenue: z.number().default(0),
   newCustomers: z.number().default(0),
   activeAccounts: z.number().default(0),
   growthRate: z.number().default(0),
})

export type OverviewValues = z.infer<typeof overviewSchema>
