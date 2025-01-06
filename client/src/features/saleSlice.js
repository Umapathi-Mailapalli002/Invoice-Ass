import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { generateInvoicePDF } from "../utils/generateInvoicePDF";

// Action for fetching all sales
export const getAllSales = createAsyncThunk(
  "sales/getAllSales",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/users/sales/getAll-sales", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch sales"
      );
    }
  }
);

// Action for creating a new sale
export const createSale = createAsyncThunk(
  "sales/createSale",
  async (
    { customerName, productName, price, quantity, totalAmount, category },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/api/v1/users/sales/create-sale", {
        customerName,
        productName,
        price,
        quantity,
        totalAmount,
        category,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create sale"
      );
    }
  }
);

// Action for updating an existing sale
export const updateSale = createAsyncThunk(
  "sales/updateSale",
  async (
    { id, customerName, productName, price, quantity, totalAmount, category },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/users/sales/update-sale/${id}`,
        { customerName, productName, price, quantity, totalAmount, category }
      );
      return {...response.data, id};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update sale"
      );
    }
  }
);

// Action for deleting a sale
export const deleteSale = createAsyncThunk(
  "sales/deleteSale",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/users/sales/delete-sale/${id}`
      );
      return {...response.data, id};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete sale"
      );
    }
  }
);

// Action for fetching most sold products
export const getMostSoldProducts = createAsyncThunk(
  "sales/getMostSoldProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/users/sales/most-sold");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch most sold products"
      );
    }
  }
);

const initialState = {
  sales: [],
  mostSoldProducts: [],
  loading: false,
  error: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Sales
    builder
      .addCase(getAllSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload.data;
      })
      .addCase(getAllSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Sale
    builder
      .addCase(createSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;
        generateInvoicePDF({...data});
        state.sales.push(action.payload.data);
      })
      .addCase(createSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Sale
    builder
    .addCase(updateSale.fulfilled, (state, action) => {
      state.loading = false;
        const { id, ...data } = action.payload;
        const index = state.sales.findIndex((sale) => sale._id === id);
      if (index >= 0) {
        state.sales[index] = data;
      } else {
        console.error("Sale with the given ID not found:", id);
      }
    });
  
    // Delete Sale
    builder
      .addCase(deleteSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        const { id, ...data} = action.payload;
        state.sales = state.sales?.filter(
          (sale) => sale._id !== id
        );
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Most Sold Products
    builder
      .addCase(getMostSoldProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMostSoldProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.mostSoldProducts = action.payload.data;
      })
      .addCase(getMostSoldProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default salesSlice.reducer;
