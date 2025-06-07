import { BarGraph } from '@/features/overview/components/bar-graph'
import { delay } from '@/utils/common'

export default async function BarStats() {
   await delay(1000)

   return <BarGraph />
}
