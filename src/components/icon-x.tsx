import { Icon, IconifyIconProps } from '@iconify-icon/react';
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';
import React from 'react';

export const IconX = ({
  icon,
  size = 24,
  className = '',
  color
}: IconifyIconProps) => {
  function isLucideName(value: any): value is IconName {
    return iconNames.includes(value);
  }

  if (isLucideName(icon)) {
    return (
      <DynamicIcon
        name={icon}
        size={size}
        className={className}
        color={color}
      />
    );
  }
  return (
    <Icon
      icon={icon}
      size={size}
      className={className}
      color={color}
      aria-hidden='true'
    />
  );
};
