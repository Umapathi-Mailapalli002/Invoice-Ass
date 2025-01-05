import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Sale } from "../models/sales.model.js";
import { logUserActivity } from "../utils/userActivityLogs.js";
const createSale = asyncHandler(async (req, res) => {
  const user = req.user;
  const { customerName, productName, price, quantity, category } = req.body;

  if (
    [customerName, productName, price, quantity, category].some(
      (field) => field?.trim?.() === "" || field === undefined
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const totalAmount = price * quantity;

  const newSale = await Sale.create({
    customerName,
    productName,
    price,
    quantity,
    totalAmount,
    category,
    createdBy: user._id,
  });

  if (!newSale) {
    throw new ApiError(500, "Something went wrong while creating the sale");
  }
await logUserActivity(user.username, "Created Sale", newSale._id)
  return res
    .status(201)
    .json(new ApiResponse(201, newSale, "Sale created successfully"));
});

const getAllSales = asyncHandler(async (req, res) => {
  const {
    category,
    search,
    sortByDate,
    sortByCustomerName,
    sortById,
    sortByQuantity,
  } = req.query;

  const query = [];

  // Search Filter
  if (search) {
    query.push({
      $match: {
        $or: [
          { customerName: { $regex: search, $options: "i" } },
          { productName: { $regex: search, $options: "i" } },
        ],
      },
    });
  }

  // Handle empty pipeline
  if (query.length === 0) {
    query.push({ $match: {} }); // Default to match all documents
  }

  // Category Filter
  if (category && category !== "All") {
    query.push({
      $match: { category: { $regex: category, $options: "i" } },
    });
  }

  
  // Sorting Logic
  const sortCriteria = {};
  if (sortByDate) sortCriteria.createdAt = sortByDate === "desc" ? -1 : 1;
  if (sortByCustomerName)
    sortCriteria.customerName = sortByCustomerName === "desc" ? -1 : 1;
  if (sortById) sortCriteria._id = sortById === "desc" ? -1 : 1;
  if (sortByQuantity)
    sortCriteria.quantity = sortByQuantity === "desc" ? -1 : 1;

  if (Object.keys(sortCriteria).length > 0) {
    query.push({ $sort: sortCriteria });
  }

  // Fetch Data with Aggregation
  const sales = await Sale.aggregate(query);

  // Check if results exist
  if (!sales.length) {
    throw new ApiError(404, "No sales found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, sales, "Sales fetched successfully"));
});


const updateSale = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { customerName, productName, price, quantity, category } = req.body;

  const totalAmount = price * quantity;

  const updatedSale = await Sale.findByIdAndUpdate(
    id,
    {
      customerName,
      productName,
      price,
      quantity,
      totalAmount,
      category,
    },
    { new: true }
  );

  if (!updatedSale) {
    throw new ApiError(404, "Sale not found");
  }
  await logUserActivity(req?.user?.username, "Updated Sale", updatedSale._id)
  return res
    .status(200)
    .json(new ApiResponse(200, updatedSale, "Sale updated successfully"));
});

const deleteSale = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedSale = await Sale.findByIdAndDelete(id);

  if (!deletedSale) {
    throw new ApiError(404, "Sale not found");
  }
  await logUserActivity(req?.user?.username, "Deleted Sale", deletedSale._id)
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Sale deleted successfully"));
});

const getMostSoldProducts = asyncHandler(async (req, res) => {
  const mostSold = await Sale.aggregate([
    {
      $group: {
        _id: "$productName",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 10 },
  ]);

  if (!mostSold) {
    throw new ApiError(404, "No data found for most sold products");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, mostSold, "Most sold products fetched successfully")
    );
});

export { createSale, updateSale, getAllSales, getMostSoldProducts, deleteSale };
