export type CategoryData = {
  name: string;
  parent?: string | null;
};

export type Category = {
  id: string;
  name: string;
  parentId: number;
  updatedAt: string;
};
