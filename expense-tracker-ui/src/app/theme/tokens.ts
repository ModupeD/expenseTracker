import { Category } from '../models/category';

export const palette = {
  emerald: '#10b981',
  violet: '#8b5cf6',
  amber: '#f59e0b',
  blue: '#3b82f6',
  red: '#ef4444',
  pink: '#ec4899',
  orange: '#f97316',
  gray: '#6b7280'
} as const;

export const CATEGORY_COLOR: Record<Category, string> = {
  [Category.GROCERIES]: palette.emerald,
  [Category.ENTERTAINMENT]: palette.violet,
  [Category.UTILITIES]: palette.amber,
  [Category.TRANSPORT]: palette.blue,
  [Category.TRAVEL]: palette.blue,
  [Category.SHOPPING]: palette.red,
  [Category.HEALTH]: palette.pink,
  [Category.RENT]: palette.orange,
  [Category.OTHER]: palette.gray
};

export function colorFor(category: string): string {
  return CATEGORY_COLOR[category as Category] ?? palette.gray;
}
