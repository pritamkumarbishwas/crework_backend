import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // Check if token is provided
        if (!token) {
            throw new ApiError(401, "Unauthorized request: Token missing");
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        // Check if user exists
        if (!user) {
            throw new ApiError(401, "Invalid Access Token: User not found");
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        // Handle verification and user retrieval errors
        const message = error instanceof jwt.JsonWebTokenError
            ? "Invalid access token: Token error"
            : error.message || "Unauthorized request";

        throw new ApiError(401, message);
    }
});
