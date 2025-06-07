import { faker } from '@faker-js/faker'
import { matchSorter } from 'match-sorter'

import { ProductType } from '@/features/products/data/schema'
import { delay } from '@/utils/common'

// Mock product data store
export const fakeProducts = {
   records: [] as ProductType[], // Holds the list of product objects

   // Initialize with sample data
   initialize() {
      const sampleProducts: ProductType[] = []

      function generateRandomProductData(id: number): ProductType {
         const categories = [
            'Electronics',
            'Furniture',
            'Clothing',
            'Toys',
            'Groceries',
            'Books',
            'Jewelry',
            'Beauty Products',
         ]

         return {
            id,
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            created_at: faker.date
               .between({ from: '2022-01-01', to: '2023-12-31' })
               .toISOString(),
            price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
            photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
            category: faker.helpers.arrayElement(categories),
            updated_at: faker.date.recent().toISOString(),
         }
      }

      // Generate remaining records
      for (let i = 1; i <= 20; i++) {
         sampleProducts.push(generateRandomProductData(i))
      }

      this.records = sampleProducts
   },

   // Get all products with optional category filtering and search
   async getAll({ categories = [], q }: { categories?: string[], q?: string }) {
      let products = [...this.records]

      // Filter products based on selected categories
      if (categories.length > 0) {
         products = products.filter((product) =>
            categories.includes(product.category),
         )
      }

      // Search functionality across multiple fields
      if (q) {
         products = matchSorter(products, q, {
            keys: ['name', 'description', 'category'],
         })
      }

      return products
   },

   // Get paginated results with optional category filtering and search
   async getProducts({ page = 1, limit = 10, categories, q }: { page?: number, limit?: number, categories?: string[], q?: string }) {
      await delay(1000)
      const allProducts = await this.getAll({ categories, q })

      // Pagination logic
      const total = allProducts.length
      const offset = (page - 1) * limit
      const products = allProducts.slice(offset, offset + limit)

      // Mock current time
      const currentTime = new Date().toISOString()

      // Return paginated response
      return {
         success: true,
         data: products,
         message: 'Sample data for testing and learning purposes',
         total: total,
         offset: offset,
         limit: limit,
         time: currentTime,
      }
   },

   // Get a specific product by its ID
   async getProductById(id: number) {
      await delay(1000) // Simulate a delay

      // Find the product by its ID
      const product = this.records.find((product) => product.id && product.id === id)

      if (!product) {
         return {
            success: false,
            message: `Product with ID ${id} not found`,
         }
      }

      // Mock current time
      const currentTime = new Date().toISOString()

      return {
         success: true,
         data: product,
         message: `Product with ID ${id} found`,
         time: currentTime,
      }
   },
}

// Initialize sample products
fakeProducts.initialize()
