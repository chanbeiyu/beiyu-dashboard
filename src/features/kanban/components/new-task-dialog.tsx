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
import { Textarea } from '@/components/ui/textarea'

import { useTaskStore } from '../utils/store'

export default function NewTaskDialog() {
   const addTask = useTaskStore((state) => state.addTask)

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const form = e.currentTarget
      const formData = new FormData(form)
      const { title, description } = Object.fromEntries(formData)

      if (typeof title !== 'string' || typeof description !== 'string') return
      addTask(title, description)
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button size="sm" variant="secondary">
               ＋ Add New Todo
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Add New Todo</DialogTitle>
               <DialogDescription>
                  What do you want to get done today?
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
                     placeholder="Todo title..."
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Textarea
                     className="col-span-4"
                     id="description"
                     name="description"
                     placeholder="Description..."
                  />
               </div>
            </form>
            <DialogFooter>
               <DialogTrigger asChild>
                  <Button form="todo-form" size="sm" type="submit">
                     Add Todo
                  </Button>
               </DialogTrigger>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
