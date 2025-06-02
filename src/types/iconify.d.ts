import { IconifyIcon } from '@iconify/react';

declare module 'tailwindcss' {
  interface PluginAPI {
    addVariant: (name: string, definition: string | string[]) => void;
  }
}

declare global {
  // 声明图标类名类型
  type IconifyClassName = `icon-${string}`;

  // 扩展 JSX 元素属性
  namespace JSX {
    interface IntrinsicAttributes {
      class?: any;
    }
  }

  // 扩展 HTML 属性
  interface HTMLAttributes<T> {
    class?: string | IconifyClassName | (string | IconifyClassName)[];
  }
}

// 声明所有可能的图标类名
type IconCollections = 'lucide' | 'logos'; // 添加你需要的集合
type IconNames = 'activity' | 'home' | 'user' | 'settings'; // 添加你需要的图标名

export type AllIconClassNames = `icon-[${IconCollections}--${IconNames}]`;
