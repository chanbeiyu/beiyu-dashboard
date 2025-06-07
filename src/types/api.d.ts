import { Prisma } from '@prisma/client'
import { SWRConfiguration } from 'swr'
import { SWRMutationConfiguration } from 'swr/mutation'

declare namespace Api {
   namespace Common {
    type YesOrNo = 'Y' | 'N'

    type Bool = 0 | 1

    type Gender = 0 | 1 | 2

    /** The strategic pattern */
    interface StrategicPattern {
       /** The condition */
       condition: boolean
       /** If the condition is true, then call the action function */
       callback: () => void
    }

    /**
     * The option type
     *
     * @property value: The option value
     * @property label: The option label
     */
    type Option<V> = { value: V, label: string }

    /**
     * The option type
     *
     * @property value: The option value
     * @property label: The option label
     * @property className: The option className
     */
    type Option<V> = { value: V, label: string, className: string }

    /**
     * The option type
     *
     * @property key: The option key
     * @property value: The option value
     * @property label: The option label
     */
    type Option<K = string | number, V> = { key: K, value: V, label: string }

    type Result = { success: boolean, error?: Error, msg?: string }

    /** add null to all properties */
    type RecordNullable<T> = {
       [K in keyof T]?: T[K] | null;
    }
   }

   namespace Data {
    /** 数据状态标识 */
    type Deleted = 0 | 1

    /** 排序方向 */
    type SortDirection = 'asc' | 'desc'
    type CursorDirection = 'next' | 'prev'

    /** 排序相关字段 */
    interface SortParam {
       field: string
       direction: SortDirection
    }

    /** 页码分页排序相关字段 */
    interface PageParam {
       page: number
       pageSize: number
       total: number
       totalPages: number
    }

    /** 游标分页排序相关字段 */
    interface CursorParam {
       cursor: number
       limit: number
       direction: CursorDirection
       nextCursor: number
       prevCursor: number
       hasNext: boolean
       total: number
    }

    /** 分页排序请求参数 */
    interface PaginatingParams {
       paginating?:
          | Pick<PageParam, 'page' | 'pageSize'>
          | Pick<CursorParam, 'cursor' | 'limit'>
       orders?: SortParam | SortParam[]
    }

    /** 分页排序返回数据 */
    interface PaginatingRecord<T = any> {
       records: T[]
       paginating?: PageParam | CursorParam
       orders?: SortParam | SortParam[]
    }

    type Record<T = any> = {
       id: number | string
       createBy: string
       createTime: Date
       updateBy: string | null
       updateTime: Date | null
       deleted: Deleted
    } & T

    type Result<T> = {
       success: boolean
       code?: number
       error?: Error
       message?: string
    }

    type PageResult<T> = {
       success: boolean
       code?: number
       error?: Error
       message?: string
       records?: PaginatingCursorRecord<T>[]
    }
   }

   namespace SWR {
      interface HydratedHandle<T, A extends object = object> {
         sKey: string
         fetcher: ({ ...args }: A) => Promise<T>
         config?: SWRConfiguration
      }

      interface HydratedMutationHandle<T, A = any> {
         sKey: string
         fetcher: ({ ...args }: A) => Promise<T>
         config?: SWRMutationConfiguration
      }

      interface HydratedPageHandle<T, A> {
         sKey: string
         fetcher: ({ ...args }: A) => Promise<T>
         config?: SWRMutationConfiguration
      }
   }

   /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
   namespace Auth {
      interface LoginToken {
         token: string
         refreshToken: string
      }

      interface UserInfo {
         userId: string
         userName: string
         roles: string[]
         buttons: string[]
      }
   }

   namespace Photo {
    type SearchModel = Prisma.PromiseReturnType<typeof db.photo.find>
    type GetPhotoArgs = Common.QueryCursorParams

    export interface SearchParams {
       menu: UnionKey.Menus
       skip?: number
       take?: number
    }
   }

   namespace User {
    type Model = Prisma.PromiseReturnType<typeof db.user.find>
    type GetPhotoArgs = Common.QueryCursorParams
   }
}
