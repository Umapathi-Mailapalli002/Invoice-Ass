import { UserActivity } from "../models/userActivity.model.js";

export const logUserActivity = async (user, actionType, actionId) => {
  try {
    const createUserActivity = await UserActivity.create({
      user,
      actionType,
      actionId,
    });
    return createUserActivity;
  } catch (error) {
    console.error("Error details:", error.message);
    console.error("Data for logging activity - User:", user, "ActionType:", actionType, "ActionId:", actionId);
  }
};
