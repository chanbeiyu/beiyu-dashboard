import { createSearchParamsCache, createSerializer, parseAsInteger, parseAsString } from 'nuqs/server'
import { z } from 'zod'

import { parseAsStringArray } from '@/lib/nuqs-extends'

const userStatusSchema = z.union([
   z.literal('active'),
   z.literal('inactive'),
   z.literal('invited'),
   z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
   z.literal('superadmin'),
   z.literal('admin'),
   z.literal('cashier'),
   z.literal('manager'),
])
export type UserRole = z.infer<typeof userRoleSchema>

export const userParsers = {
   page: parseAsInteger.withDefault(1),
   perPage: parseAsInteger.withDefault(10),
   q: parseAsString,
   status: parseAsStringArray(),
   role: parseAsStringArray(),
   // advanced filter
   // filters: getFiltersStateParser().withDefault([]),
   // joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and')
}

export const userSearch = createSearchParamsCache(userParsers)
export const userSerialize = createSerializer(userParsers)

const userSchema = z.object({
   id: z.string(),
   firstName: z.string(),
   lastName: z.string(),
   username: z.string(),
   email: z.string(),
   phoneNumber: z.string(),
   status: userStatusSchema,
   role: userRoleSchema,
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date(),
})
export type UserType = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
