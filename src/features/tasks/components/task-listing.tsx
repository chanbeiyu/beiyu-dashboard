import { columns, fakeTasks, taskSearch, TaskTable } from '@/features/tasks'

export async function TaskListing() {
   // Showcasing the use of search params cache in nested RSCs
   const { page, perPage, q, status, priority, label } = taskSearch.all()

   const filters = {
      page,
      limit: perPage,
      ...(q && { q }),
      ...(status && { statuses: status }),
      ...(priority && { priorities: priority }),
      ...(label && { labels: label }),
   }

   const { success, message, total, data } = await fakeTasks.getTasks(filters)

   return (
      <TaskTable
         columns={columns}
         data={data}
         total={total}
      />
   )
}
