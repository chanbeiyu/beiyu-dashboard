import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useCalendar } from '../../contexts/calendar-context'
import { AvatarGroup } from '../avatar-group'

export function UserSelect() {
   const { users, selectedUserId, setSelectedUserId } = useCalendar()

   return (
      <Select onValueChange={setSelectedUserId} value={selectedUserId}>
         <SelectTrigger className="flex-1 md:w-48">
            <SelectValue />
         </SelectTrigger>

         <SelectContent align="end">
            <SelectItem value="all">
               <div className="flex items-center gap-1">
                  <AvatarGroup max={2}>
                     {users.map((user) => (
                        <Avatar className="size-6 text-xxs" key={user.id}>
                           <AvatarImage alt={user.name} src={user.picturePath ?? undefined} />
                           <AvatarFallback className="text-xxs">{user.name[0]}</AvatarFallback>
                        </Avatar>
                     ))}
                  </AvatarGroup>
                  All
               </div>
            </SelectItem>

            {users.map((user) => (
               <SelectItem className="flex-1" key={user.id} value={user.id}>
                  <div className="flex items-center gap-2">
                     <Avatar className="size-6" key={user.id}>
                        <AvatarImage alt={user.name} src={user.picturePath ?? undefined} />
                        <AvatarFallback className="text-xxs">{user.name[0]}</AvatarFallback>
                     </Avatar>

                     <p className="truncate">{user.name}</p>
                  </div>
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}
