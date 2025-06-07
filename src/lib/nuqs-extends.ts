import { createParser } from 'nuqs/server'
import { z } from 'zod'

const DEFAULT_SEPARATOR = ','

const numberArraySchema = z.array(z.number())
const stringArraySchema = z.array(z.string())

/**
 * 自定义 SSR 数字数组解析器
 *
 * @param {string} separator
 */
const parseAsNumberArray = (separator: string = DEFAULT_SEPARATOR) => {
   return createParser({
      parse: (value: string | string[] | undefined) => {
         if (!value) return []
         const str = Array.isArray(value) ? value[0] : value
         const parsed = numberArraySchema.safeParse(str.split(separator).map(Number))
         return parsed.success ? parsed.data : []
      },
      serialize: (value: number[]) => value.join(separator),
      eq: (a: number[], b: number[]) => a.length === b.length && a.every((v, i) => v === b[i]),
   })
}

/**
 *  自定义 SSR 字符串数组解析器
 * @param {string} separator
 */
const parseAsStringArray = (separator: string = DEFAULT_SEPARATOR) => {
   return createParser({
      parse: (value: string | string[] | undefined) => {
         if (!value) return []
         const str = Array.isArray(value) ? value[0] : value
         const parsed = stringArraySchema.safeParse(str.split(separator))
         return parsed.success ? parsed.data : []
      },
      serialize: (value: string[]) => value.join(separator),
      eq: (a: string[], b: string[]) => a.length === b.length && a.every((v, i) => v === b[i]),
   })
}

export { parseAsNumberArray, parseAsStringArray }
