export type BudgetCategory = {
  id: number;
  name: string;
  allocated: number;
  spent: number;
};

export type BudgetPlan = {
  id: string;
  month: string;
  year: number;
  income: number;
  categories: BudgetCategory[];
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
