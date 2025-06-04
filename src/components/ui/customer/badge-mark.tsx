// components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

// 1. 定义位置变体（核心扩展）
const badgePositionVariants = cva("absolute", {
  variants: {
    position: {
      "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
      "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
      "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
      "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
      top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
      right: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
      bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
      left: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
    }
  },
  defaultVariants: {
    position: "top-right"
  }
})

// 2. 基础样式变体（保留原始设计）
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-1 py-0 font-normal text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

// 3. 类型定义
export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants>,
    VariantProps<typeof badgePositionVariants> {
  asChild?: boolean
  offset?: [number, number]  // 自定义偏移量 [x, y]（参考网页1[1](@ref)）
}

// 4. 组件实现
const BadgeMark = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, position, offset, style, ...props }, ref) => {
    // 处理自定义偏移
    const offsetStyle = offset ? {
      '--x-offset': `${offset[0]}px`,
      '--y-offset': `${offset[1]}px`,
      transform: `translate(calc(var(--x-offset) * var(--x-sign)), calc(var(--y-offset) * var(--y-sign)))`
    } : {}

    // 动态计算方向符号（用于偏移计算）
    const positionSigns = {
      'top-right': { '--x-sign': 1, '--y-sign': -1 },
      'top-left': { '--x-sign': -1, '--y-sign': -1 },
      'bottom-right': { '--x-sign': 1, '--y-sign': 1 },
      'bottom-left': { '--x-sign': -1, '--y-sign': 1 },
      top: { '--x-sign': 0, '--y-sign': -1 },
      right: { '--x-sign': 1, '--y-sign': 0 },
      bottom: { '--x-sign': 0, '--y-sign': 1 },
      left: { '--x-sign': -1, '--y-sign': 0 }
    }

    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant }),
          badgePositionVariants({ position }),
          className
        )}
        style={{
          ...positionSigns[position || 'top-right'],
          ...offsetStyle,
          ...style
        }}
        {...props}
      />
    )
  }
)
BadgeMark.displayName = "BadgeMark"

export { BadgeMark, badgeVariants }
