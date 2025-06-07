import { ArrowDown, ArrowRight, ArrowUp, BookmarkCheck, Circle, CircleCheck, CircleX, GitCommitHorizontal } from 'lucide-react'

import { Option } from '@/types/data-table'

export const LABEL_OPTIONS: Option[] = [
   {
      value: 'bug',
      label: 'Bug',
   },
   {
      value: 'feature',
      label: 'Feature',
   },
   {
      value: 'documentation',
      label: 'Documentation',
   },
]

export const TASK_STATUS_OPTIONS: Option[] = [
   {
      value: 'backlog',
      label: 'Backlog',
      icon: BookmarkCheck,
   },
   {
      value: 'todo',
      label: 'Todo',
      icon: Circle,
   },
   {
      value: 'in progress',
      label: 'In Progress',
      icon: GitCommitHorizontal,
   },
   {
      value: 'done',
      label: 'Done',
      icon: CircleCheck,
   },
   {
      value: 'canceled',
      label: 'Canceled',
      icon: CircleX,
   },
]

export const TASK_PRIORITY_OPTIONS: Option[] = [
   {
      label: 'Low',
      value: 'low',
      icon: ArrowDown,
   },
   {
      label: 'Medium',
      value: 'medium',
      icon: ArrowRight,
   },
   {
      label: 'High',
      value: 'high',
      icon: ArrowUp,
   },
]
