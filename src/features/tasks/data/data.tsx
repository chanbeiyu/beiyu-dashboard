import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookmarkCheck,
  Circle,
  CircleCheck,
  CircleX,
  GitCommitHorizontal
} from 'lucide-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug'
  },
  {
    value: 'feature',
    label: 'Feature'
  },
  {
    value: 'documentation',
    label: 'Documentation'
  }
];

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: BookmarkCheck
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: GitCommitHorizontal
  },
  {
    value: 'done',
    label: 'Done',
    icon: CircleCheck
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CircleX
  }
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp
  }
];
