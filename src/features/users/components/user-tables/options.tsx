import { HandCoins, UserCheck, UserCog, UsersRound } from 'lucide-react'

import { UserRole, UserStatus } from '@/features/users'
import { Option } from '@/types/data-table'

// export const callTypes = new Map<UserStatus, string>([
//    ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
//    ['inactive', 'bg-neutral-300/40 border-neutral-300'],
//    ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
//    [
//       'suspended',
//       'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
//    ],
// ])

export const USER_STATUS_OPTIONS: Option<UserStatus>[] = [
   {
      label: 'Active',
      value: 'active',
      className: 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
   },
   {
      label: 'Inactive',
      value: 'inactive',
      className: 'bg-neutral-300/40 border-neutral-300',
   },
   {
      label: 'Invited',
      value: 'invited',
      className: 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300',
   },
   {
      label: 'Suspended',
      value: 'suspended',
      className: 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
   },
]

export const USER_ROLE_OPTIONS: Option<UserRole>[] = [
   {
      label: 'Superadmin',
      value: 'superadmin',
      icon: UserCog,
   },
   {
      label: 'Admin',
      value: 'admin',
      icon: UsersRound,
   },
   {
      label: 'Manager',
      value: 'manager',
      icon: UserCheck,
   },
   {
      label: 'Cashier',
      value: 'cashier',
      icon: HandCoins,
   },
]
