import { RecentSales } from '@/features/overview/components/recent-sales';
import { delay } from '@/utils/common';

export default async function Sales() {
  await delay(3000);
  return <RecentSales />;
}
