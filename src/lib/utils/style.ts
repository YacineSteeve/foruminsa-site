import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';

export const cn = (...classNames: Array<ClassValue>) => twMerge(clsx(classNames));
