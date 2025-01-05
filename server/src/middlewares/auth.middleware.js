import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/AsyncHandler.js"


export const verifyJWT = asyncHandler(async(req, _,next) => {
   try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
     throw new ApiError(401, "Unauthorized request");
    }
 
   const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
 
   const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
 
   if (!user) {
     throw new ApiError(401, "Invalid Access Token")
   }
 
   req.user = user;
   
   next()
   } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
   }
})


// roleMiddleware.js


export const authorizedRole = (allowedRoles) => 
  asyncHandler(async (req, res, next) => {
    try {
      const  role  = req.user?.role;
        
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: "Forbidden: Access Denied" });
      }
      next(); 

    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token")

    }

  });
