import React from 'react';

interface DividerProps {
  color?: string;
  vertical?: boolean;
  customHeight?: string;
}

export const Divider = ({ color = '#2c2c2c', vertical = false, customHeight }: DividerProps) => (
  <div
    className={`bg-[${color}] ${vertical ? 'w-[1px]' : 'w-full'} ${
      vertical ? customHeight || 'h-full min-h-[28px]' : 'h-[1px]'
    }`}
    style={{ backgroundColor: color, height: vertical ? customHeight : undefined }}
  />
);
