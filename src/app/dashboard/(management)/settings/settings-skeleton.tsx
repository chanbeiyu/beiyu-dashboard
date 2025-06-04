import { Skeleton } from '@/components/ui/skeleton';

export function SettingsSkeleton() {
  return (
    <div className="space-y-8">
      {/* 通知类型选择区域 */}
      <div className="relative space-y-3">
        <Skeleton className="h-5 w-1/4 mb-4" />
        <div className="flex flex-col space-y-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      </div>

      {/* 邮件通知区域 */}
      <div className="relative">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-6 w-11 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* 移动设备设置 */}
      <div className="flex flex-row items-start space-x-3">
        <Skeleton className="h-5 w-5 mt-1" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>

      {/* 提交按钮 */}
      <Skeleton className="h-10 w-40" />
    </div>
  );
}
