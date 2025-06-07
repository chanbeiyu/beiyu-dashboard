import { AreaGraph } from '@/features/overview/components/area-graph'
import { delay } from '@/utils/common'

export default async function AreaStats() {
   await delay(2000)
   return <AreaGraph />
}
