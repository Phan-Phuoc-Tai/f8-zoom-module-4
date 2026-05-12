export type CategoryData = {
  name: string;
  parentId: string | null;
};

export type Category = {
  id: string;
  name: string;
  parentId: number;
  updatedAt: string;
};
