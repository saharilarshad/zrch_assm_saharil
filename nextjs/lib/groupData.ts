export const groupItemsByLocation = (items: any[]) => {
  return items.reduce((groups, item) => {
    if (item?.billing_records) {
      const { location } = item?.billing_records;
      if (!groups[location]) {
        groups[location] = [];
      }
      groups[location].push(item);
    }
    return groups;
  }, {});
};

export const groupItemsByProductCode = (items: any[]) => {
  return items.reduce((groups, item) => {
    if (item?.billing_records) {
    const { product_id } = item?.billing_records;
    if (!groups[product_id]) {
      groups[product_id] = [];
    }
    groups[product_id].push(item);
}
    return groups;
  }, {});
};
