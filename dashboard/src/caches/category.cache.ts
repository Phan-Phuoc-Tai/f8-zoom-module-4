export const CATEGORY_CACHE = {
  LIST_ALL: ["categories"],
  LIST(filters: { [k: string]: string }) {
    return ["categories", filters];
  },
  ITEM(id: string) {
    return [this.LIST, id];
  },
};
