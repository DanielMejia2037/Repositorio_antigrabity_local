import type { SVGAttributes } from 'react';
import { cn } from '@/lib/utils';

type IconName =
  | 'dollar'
  | 'users'
  | 'chart'
  | 'tag'
  | 'menu'
  | 'x'
  | 'logout'
  | 'dashboard'
  | 'reports'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-right';

interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number;
  className?: string;
}

const paths: Record<IconName, string> = {
  dollar:
    'M12 1v22M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6',
  users:
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 4a4 4 0 0 1 4 4v2m-4-6a4 4 0 0 0 0-8',
  chart:
    'M18 20V10M12 20V4M6 20v-6',
  tag:
    'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01',
  menu:
    'M3 12h18M3 6h18M3 18h18',
  x:
    'M18 6 6 18M6 6l12 12',
  logout:
    'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  dashboard:
    'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  reports:
    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  'chevron-up': 'M18 15l-6-6-6 6',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-right': 'M9 18l6-6-6-6',
};

export function Icon({ name, size = 20, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
