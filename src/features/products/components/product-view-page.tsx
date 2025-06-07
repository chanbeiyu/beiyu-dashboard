import { notFound } from 'next/navigation'

import { fakeProducts, ProductType } from '@/features/products'

import ProductForm from './product-form'

type ProductViewPageProps = {
   productId: string
}

export default async function ProductViewPage({ productId }: ProductViewPageProps) {
   let product = null
   let pageTitle = 'Create New Product'

   if (productId !== 'new') {
      const data = await fakeProducts.getProductById(Number(productId))
      product = data.data as ProductType
      if (!product) {
         notFound()
      }
      pageTitle = `Edit Product`
   }

   return <ProductForm initialData={product} pageTitle={pageTitle} />
}
