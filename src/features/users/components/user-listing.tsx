import { columns, fakeUsers, userSearch, UserTable } from '@/features/users'

export async function UserListing() {
   // Showcasing the use of search params cache in nested RSCs
   const { page, perPage, q, role, status } = userSearch.all()

   const filters = {
      page,
      limit: perPage,
      ...(q && { q }),
      ...(role && { roles: role }),
      ...(status && { statuses: status }),
   }

   const { success, message, total, data } = await fakeUsers.getUsers(filters)

   return (
      <UserTable
         columns={columns}
         data={data}
         total={total}
      />
   )
}
