import { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay } from "../controllers/userController.js";
import express from 'express'
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router()
//using post method for apis
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/credits", userAuth, userCredits)
userRouter.post("/pay-razor", userAuth, paymentRazorpay)
userRouter.post("/verify-razor", verifyRazorpay)

export default userRouter