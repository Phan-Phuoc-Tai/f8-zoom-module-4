export type CategoryData = {
  name: string;
  status: boolean;
};

export type Category = {
  id: string | null;
  name: string;
  status: boolean;
  updatedAt?: string;
};

export type CategoriesResponse = {
  data: Category[];
  totalPage: number;
};
