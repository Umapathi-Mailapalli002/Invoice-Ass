import mongoose, {Schema} from "mongoose";

const saleSchema = new Schema({
  customerName: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true }, // Added for category-wise filtering
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalAmount: {
    type: Number,
    required: true,
  }, // Automatically calculated using a middleware
  date: {
    type: String,
    default: function () {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false, // Field for user role validation
  },
 
}, {timestamps: true});

saleSchema.pre("save", function (next) {
  // Automatically calculate totalAmount if not provided
  if (this.price && this.quantity) {
    this.totalAmount = this.price * this.quantity;
  }
  next();
});

export const Sale = mongoose.model("Sale", saleSchema);
