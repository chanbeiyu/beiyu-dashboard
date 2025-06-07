'use client'
import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { useTaskStore } from '../utils/store'

export default function NewSectionDialog() {
   const addCol = useTaskStore((state) => state.addCol)

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const form = e.currentTarget
      const formData = new FormData(form)
      const { title } = Object.fromEntries(formData)

      if (typeof title !== 'string') return
      addCol(title)
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button className="w-full" size="lg" variant="secondary">
               ＋ Add New Section
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Add New Section</DialogTitle>
               <DialogDescription>
                  What section you want to add today?
               </DialogDescription>
            </DialogHeader>
            <form
               className="grid gap-4 py-4"
               id="todo-form"
               onSubmit={handleSubmit}
            >
               <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                     className="col-span-4"
                     id="title"
                     name="title"
                     placeholder="Section title..."
                  />
               </div>
            </form>
            <DialogFooter>
               <DialogTrigger asChild>
                  <Button form="todo-form" size="sm" type="submit">
                     Add Section
                  </Button>
               </DialogTrigger>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
