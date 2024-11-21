export interface CategoryInterface {
  count: number;
  id: number;
  name: string;
}

export interface StatisticsProps {
  categories: CategoryInterface[];
  total_suggestions: number;
  total_users: number;
}
