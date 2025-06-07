import { createSearchParamsCache, createSerializer, parseAsInteger, parseAsString } from 'nuqs/server'
import { z } from 'zod'

import { parseAsStringArray } from '@/lib/nuqs-extends'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
   'image/jpeg',
   'image/jpg',
   'image/png',
   'image/webp',
]

export const acceptedFileTypes = z.enum([
   'image/jpeg',
   'image/jpg',
   'image/png',
   'image/webp',
])

export type acceptedFileTypesType = z.infer<typeof acceptedFileTypes>

export const productParsers = {
   page: parseAsInteger.withDefault(1),
   perPage: parseAsInteger.withDefault(10),
   q: parseAsString,
   category: parseAsStringArray(),
   // advanced filter
   // filters: getFiltersStateParser().withDefault([]),
   // joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and')
}

export const productSearch = createSearchParamsCache(productParsers)
export const productSerialize = createSerializer(productParsers)

export const productSchema = z.object({
   id: z.number().optional(),
   image: z
      .any()
      .refine((files) => files?.length == 1, 'Image is required.')
      .refine(
         (files) => files?.[0]?.size <= MAX_FILE_SIZE,
         `Max file size is 5MB.`,
      )
      .refine(
         // (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
         (files) => acceptedFileTypes.parse(files?.[0]?.type),
         '.jpg, .jpeg, .png and .webp files are accepted.',
      ),
   name: z.string().min(2, {
      message: 'Product name must be at least 2 characters.',
   }),
   category: z.string(),
   price: z.number(),
   created_at: z.string().optional(),
   updated_at: z.string().optional(),
   photo_url: z.string().optional(),
   description: z.string().min(10, {
      message: 'Description must be at least 10 characters.',
   }),
})

export type ProductType = z.infer<typeof productSchema>
