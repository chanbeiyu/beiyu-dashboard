'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FileUploader } from '@/components/file-uploader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { productSchema, ProductType } from '@/features/products/data/schema'

interface ProductFormProps {
   initialData: ProductType | null
   pageTitle: string
}

export function ProductForm({ initialData, pageTitle }: ProductFormProps) {
   const defaultValues = {
      name: initialData?.name || '',
      category: initialData?.category || '',
      price: initialData?.price || 0,
      description: initialData?.description || '',
   }

   const form = useForm<ProductType>({
      resolver: zodResolver(productSchema),
      values: defaultValues,
   })

   function onSubmit(values: z.infer<typeof productSchema>) {
      // Form submission logic would be implemented here
   }

   return (
      <Card className="mx-auto w-full">
         <CardHeader>
            <CardTitle className="text-left text-2xl font-bold">
               {pageTitle}
            </CardTitle>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                     control={form.control}
                     name="image"
                     render={({ field }) => (
                        <div className="space-y-6">
                           <FormItem className="w-full">
                              <FormLabel>Images</FormLabel>
                              <FormControl>
                                 <FileUploader
                                    maxFiles={4}
                                    maxSize={4 * 1024 * 1024}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    // disabled={loading}
                                    // progresses={progresses}
                                    // pass the onUpload function here for direct upload
                                    // onUpload={uploadFiles}
                                    // disabled={isUploading}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        </div>
                     )}
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                 <Input placeholder="Enter product name" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select
                                 onValueChange={(value) => field.onChange(value)}
                                 value={field.value[field.value.length - 1]}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select categories" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="beauty">Beauty Products</SelectItem>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="clothing">Clothing</SelectItem>
                                    <SelectItem value="home">Home & Garden</SelectItem>
                                    <SelectItem value="sports">
                                       Sports & Outdoors
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Enter price"
                                    step="0.01"
                                    type="number"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <Textarea
                                 className="resize-none"
                                 placeholder="Enter product description"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit">Add Product</Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}
