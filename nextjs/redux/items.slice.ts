import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface BilingRecords {
  id:number
  location: string
  premium_paid: number
  product_id:number
}

interface CustomerBillingPortal {
  id:number
  billing_id:number
  email: string
  first_name: string
  last_name: string
  photo: string
}

export interface Item {
  billing_records:BilingRecords
  customer_billing_portal:CustomerBillingPortal
}

interface ItemsState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  status: "idle",
  error: null,
};

export const getItems = createAsyncThunk(
  "items/",
  async ({
    productCode,
    location,
  }: {
    productCode?: number | null;
    location?: string;
  }) => {
    if (productCode && productCode !== null && location) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing?productCode=${productCode}&location=${location}`
      );
      return res.data;
    } else if (productCode !== null && productCode !== undefined) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing?productCode=${productCode}`
      );
      return res.data;
    } else if (location) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing?location=${location}`
      );
      return res.data;
    } else {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing`
      );

      // console.log("getdata", res.data);
      return res.data;
    }
  }
);

export const addItem = createAsyncThunk(
  "items/addItem",
  async (item: {
    productCode: number;
    location: string;
    premiumPaid: number;
  }) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing`,
      item,
      {
        headers: {
          "X-API-KEY": "zurich",
        },
      }
    );
    return res.data;
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (item: {
    billingId: number;
    productCode: number;
    location: string;
    premiumPaid: number;
  }) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing?productCode=${item.productCode}`,
      item,
      {
        headers: {
          "X-API-KEY": "zurich",
        },
      }
    );
    return res.data;
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (productCode: number) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing?productCode=${productCode}`,
      {
        headers: {
          "X-API-KEY": "zurich",
        },
      }
    );
    console.log(res.data)
    return res.data.id;
  }
);

export const getItemById = createAsyncThunk(
  "items/getItemById",
  async (id: number) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing/${id}`
    );
    return res.data;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add item";
      })

      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add item";
      })

      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.status = "succeeded";
        const updatedItemIndex = state.items.findIndex(
          (item) => item.billing_records?.id === action.payload.billing_records?.id
        );
        if (updatedItemIndex !== -1) {
          state.items[updatedItemIndex] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update item";
      })

      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
       
        state.items = state.items.filter((item) => item.billing_records?.id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete item";
      });

    // .addCase(getItemById.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(getItemById.fulfilled, (state, action: PayloadAction<Item>) => {
    //   state.status = "succeeded";
    //   state.items = state.items.filter(
    //     (item) => item.id !== action.payload.id
    //   );
    //   state.items.push(action.payload);
    // })
    // .addCase(getItemById.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message || "Failed to get specific item";
    // });
  },
});

// export const {addItem} = itemsSlice.actions

export default itemsSlice.reducer;
