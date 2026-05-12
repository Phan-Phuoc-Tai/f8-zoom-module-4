export const CATEGORY_CACHE = {
  LIST: ["categories"],
  ITEM(id: string) {
    return [this.LIST, id];
  },
};
