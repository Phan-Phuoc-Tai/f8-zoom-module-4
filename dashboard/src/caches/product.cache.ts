export const PRODUCT_CACHE = {
  LIST_ALL: ["products"],
  LIST(filters: { [k: string]: string }) {
    return ["products", filters];
  },
  ITEM(id: string) {
    return [this.LIST, id];
  },
};
