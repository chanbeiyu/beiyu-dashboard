import { faker } from '@faker-js/faker'
import { matchSorter } from 'match-sorter'

import { delay } from '@/utils/common'

import { UserType } from './schema'

// Mock task data store
export const fakeUsers = {
   records: [] as UserType[], // Holds the list of product objects

   // Initialize with sample data
   initialize() {
      const sampleUsers: UserType[] = []

      function generateRandomUserData(id: number): UserType {
         const firstName = faker.person.firstName()
         const lastName = faker.person.lastName()
         return {
            id: faker.string.uuid(),
            firstName,
            lastName,
            username: faker.internet.username({ firstName, lastName }).toLocaleLowerCase(),
            email: faker.internet.email({ firstName }).toLocaleLowerCase(),
            phoneNumber: faker.phone.number({ style: 'international' }),
            status: faker.helpers.arrayElement([
               'active',
               'inactive',
               'invited',
               'suspended',
            ]),
            role: faker.helpers.arrayElement([
               'superadmin',
               'admin',
               'cashier',
               'manager',
            ]),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
         }
      }

      // Generate remaining records
      for (let i = 1; i <= 20; i++) {
         sampleUsers.push(generateRandomUserData(i))
      }

      this.records = sampleUsers
   },

   // Get all products with optional category filtering and search
   async getAll({ roles = [], statuses = [], q }: { roles?: string[], statuses?: string[], q?: string }) {
      let users = [...this.records]

      // Filter task based on selected priorities and status
      if (roles.length > 0) {
         users = users.filter((task) =>
            roles.includes(task.role),
         )
      }
      if (statuses.length > 0) {
         users = users.filter((task) =>
            statuses.includes(task.status),
         )
      }

      // Search functionality across multiple fields
      if (q) {
         users = matchSorter(users, q, {
            keys: ['firstName', 'lastName', 'username', 'email', 'phoneNumber'],
         })
      }

      return users
   },

   // Get paginated results with optional category filtering and search
   async getUsers({ page = 1, limit = 10, roles, statuses, q }: { page?: number, limit?: number, roles?: string[], statuses?: string[], q?: string }) {
      // await delay(1000)

      const allUsers = await this.getAll({
         roles: roles,
         statuses: statuses,
         q,
      })

      const total = allUsers.length
      const offset = (page - 1) * limit
      const users = allUsers.slice(offset, offset + limit)

      // Mock current time
      const currentTime = new Date().toISOString()

      // Return paginated response
      return {
         success: true,
         message: 'Sample data for testing and learning purposes',
         data: users,
         total: total,
         offset: offset,
         limit: limit,
         time: currentTime,
      }
   },

   // Get a specific task by its ID
   async getUserById(id: string) {
      await delay(1000) // Simulate a delay

      // Find the product by its ID
      const user = this.records.find((product) => product.id && product.id === id)

      if (!user) {
         return {
            success: false,
            message: `User with ID ${id} not found`,
         }
      }

      // Mock current time
      const currentTime = new Date().toISOString()

      return {
         data: user,
         success: true,
         time: currentTime,
         message: `User with ID ${id} found`,
      }
   },
}

// Initialize sample products
fakeUsers.initialize()
