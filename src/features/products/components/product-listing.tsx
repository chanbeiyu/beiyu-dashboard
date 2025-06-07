import { columns, fakeProducts, productSearch, ProductTable } from '@/features/products'

export async function ProductListing() {
   // Showcasing the use of search params cache in nested RSCs
   const { page, perPage, q, category } = productSearch.all()

   const filters = {
      page,
      limit: perPage,
      ...(q && { q }),
      ...(category && { categories: category }),
   }

   const { success, total, data, message } = await fakeProducts.getProducts(filters)

   return (
      <ProductTable
         columns={columns}
         data={data}
         total={total}
      />
   )
}
