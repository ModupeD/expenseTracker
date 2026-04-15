export enum Category {
  GROCERIES = 'GROCERIES',
  ENTERTAINMENT = 'ENTERTAINMENT',
  UTILITIES = 'UTILITIES',
  TRANSPORT = 'TRANSPORT',
  TRAVEL = 'TRAVEL',
  SHOPPING = 'SHOPPING',
  HEALTH = 'HEALTH',
  RENT = 'RENT',
  OTHER = 'OTHER'
}

export const ALL_CATEGORIES: Category[] = Object.values(Category);

export interface SummaryItem {
  category: Category;
  total: number;
}
