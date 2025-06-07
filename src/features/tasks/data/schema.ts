import { createSearchParamsCache, createSerializer, parseAsInteger, parseAsString } from 'nuqs/server'
import { z } from 'zod'

import { parseAsStringArray } from '@/lib/nuqs-extends'

export const taskParsers = {
   page: parseAsInteger.withDefault(1),
   perPage: parseAsInteger.withDefault(10),
   q: parseAsString,
   status: parseAsStringArray(),
   priority: parseAsStringArray(),
   label: parseAsStringArray(),
   // advanced filter
   // filters: getFiltersStateParser().withDefault([]),
   // joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and')
}

export const taskSearch = createSearchParamsCache(taskParsers)
export const taskSerialize = createSerializer(taskParsers)

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
   id: z.string(),
   title: z.string(),
   status: z.string(),
   label: z.string(),
   priority: z.string(),
})

export type TaskType = z.infer<typeof taskSchema>
