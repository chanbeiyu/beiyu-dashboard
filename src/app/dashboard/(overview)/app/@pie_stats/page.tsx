import { PieGraph } from '@/features/overview/components/pie-graph'
import { delay } from '@/utils/common'

export default async function Stats() {
   await delay(1000)
   return <PieGraph />
}
