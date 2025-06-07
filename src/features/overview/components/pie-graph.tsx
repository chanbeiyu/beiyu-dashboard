'use client'

import * as React from 'react'

import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
   { browser: 'chrome', visitors: 275, fill: 'var(--primary)' },
   { browser: 'safari', visitors: 200, fill: 'var(--primary-light)' },
   { browser: 'firefox', visitors: 287, fill: 'var(--primary-lighter)' },
   { browser: 'edge', visitors: 173, fill: 'var(--primary-dark)' },
   { browser: 'other', visitors: 190, fill: 'var(--primary-darker)' },
]

const chartConfig = {
   visitors: {
      label: 'Visitors',
   },
   chrome: {
      label: 'Chrome',
      color: 'var(--primary)',
   },
   safari: {
      label: 'Safari',
      color: 'var(--primary)',
   },
   firefox: {
      label: 'Firefox',
      color: 'var(--primary)',
   },
   edge: {
      label: 'Edge',
      color: 'var(--primary)',
   },
   other: {
      label: 'Other',
      color: 'var(--primary)',
   },
} satisfies ChartConfig

export function PieGraph() {
   const totalVisitors = React.useMemo(() => {
      return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
   }, [])

   return (
      <Card className="@container/card">
         <CardHeader>
            <CardTitle>Pie Chart - Donut with Text</CardTitle>
            <CardDescription>
               <span className="hidden @[540px]/card:block">
                  Total visitors by browser for the last 6 months
               </span>
               <span className="@[540px]/card:hidden">Browser distribution</span>
            </CardDescription>
         </CardHeader>
         <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
               className="mx-auto aspect-square h-[250px]"
               config={chartConfig}
            >
               <PieChart>
                  <defs>
                     {['chrome', 'safari', 'firefox', 'edge', 'other'].map(
                        (browser, index) => (
                           <linearGradient
                              id={`fill${browser}`}
                              key={browser}
                              x1="0"
                              x2="0"
                              y1="0"
                              y2="1"
                           >
                              <stop
                                 offset="0%"
                                 stopColor="var(--primary)"
                                 stopOpacity={1 - index * 0.15}
                              />
                              <stop
                                 offset="100%"
                                 stopColor="var(--primary)"
                                 stopOpacity={0.8 - index * 0.15}
                              />
                           </linearGradient>
                        ),
                     )}
                  </defs>
                  <ChartTooltip
                     content={<ChartTooltipContent hideLabel />}
                     cursor={false}
                  />
                  <Pie
                     data={chartData.map((item) => ({
                        ...item,
                        fill: `url(#fill${item.browser})`,
                     }))}
                     dataKey="visitors"
                     innerRadius={60}
                     nameKey="browser"
                     stroke="var(--background)"
                     strokeWidth={2}
                  >
                     <Label
                        content={({ viewBox }) => {
                           if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                              return (
                                 <text
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                 >
                                    <tspan
                                       className="fill-foreground text-3xl font-bold"
                                       x={viewBox.cx}
                                       y={viewBox.cy}
                                    >
                                       {totalVisitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                       className="fill-muted-foreground text-sm"
                                       x={viewBox.cx}
                                       y={(viewBox.cy || 0) + 24}
                                    >
                                       Total Visitors
                                    </tspan>
                                 </text>
                              )
                           }
                        }}
                     />
                  </Pie>
               </PieChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
               Chrome leads with
               {' '}
               {((chartData[0].visitors / totalVisitors) * 100).toFixed(1)}
               %
               {' '}
               <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
               Based on data from January - June 2024
            </div>
         </CardFooter>
      </Card>
   )
}
