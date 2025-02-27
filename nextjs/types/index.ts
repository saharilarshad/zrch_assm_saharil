export type TEditedItem = {
  productCode: number | null;
  location: string;
  premiumPaid: number | null;
};

export type TFilterData = {
  productCode: number | null;
  location: string;
};

export type TEditedData = {
  productCode: number | null;
  location: string;
  premiumPaid: number | null;
};

export type TEditeData = {
  billingId: number | null;
  productId: number | null;
};

export type TFooterData = {
  id: number;
  type: string;
  name: string;
  link: string;
};

export type TDeleteData = {
    productCode: number | null,
    customerBillingId: number | null,
};

export type THeaderData = {
  id:number
  type:string
  name:string
};
