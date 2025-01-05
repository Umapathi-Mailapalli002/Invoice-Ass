import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { UserActivity } from "../models/userActivity.model.js";
export const getAllActivities = asyncHandler(async (_, res) => {
  const getActivities = await UserActivity.find({});
  if (!getActivities) {
    throw new ApiError(404, "No activities found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, getActivities, "Successfully fetched the activities")
    );
});
