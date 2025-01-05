import mongoose, {Schema} from "mongoose";

const userActivitySchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    dateAccessed: {
        type: String,
        required: true,
        default: function() {
          // Manually format the current date and time
          const now = new Date();
  
          // Manually format the date in "YYYY-MM-DD HH:mm:ss" format
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0"); 
          const day = String(now.getDate()).padStart(2, "0"); 
          const hours = String(now.getHours()).padStart(2, "0"); 
          const minutes = String(now.getMinutes()).padStart(2, "0"); 
          const seconds = String(now.getSeconds()).padStart(2, "0");
  
          // Return the formatted date string
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
      },
    actionType: {
        type: String,
        enum: ["Created Sale", "Deleted Sale", "Updated Sale"]
    },
    actionId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "actionType"
    },
},{timestamps: true})

export const UserActivity = mongoose.model("UserActivity", userActivitySchema)