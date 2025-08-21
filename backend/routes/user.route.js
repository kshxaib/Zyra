import express from "express"
import { getCurrentUser, updateAssistant } from "../controllers/user.controller.js"
import {isAuth} from '../middlewares/isAuth.js'

const userRouter = express.Router()

userRouter.get("/current",isAuth , getCurrentUser)
userRouter.post("/update",isAuth , updateAssistant)

export default userRouter