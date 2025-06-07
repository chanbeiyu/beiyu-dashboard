import { faker } from '@faker-js/faker'

import { OverviewValues } from '@/features/overview/data/schema'
import { delay } from '@/utils/common'

export const fetchOverview = async (delayMs: number = 0): Promise<OverviewValues> => {
   await delay(delayMs)
   return {
      totalRevenue: faker.number.float({ min: 1, max: 1000 }),
      newCustomers: faker.number.int({ min: 1, max: 10000 }),
      activeAccounts: faker.number.int({ min: 1, max: 10000 }),
      growthRate: faker.number.float({ min: 0.001, max: 1 }),
      // barChart: {
      //   desktop: faker.number.int({ min: 1, max: 10000}),
      //   mobile: faker.number.int({ min: 1, max: 10000}),
      // },
      // recentSales: {
      //
      // }
   }
}
