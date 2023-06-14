import express from "express";
import {
    changeRequestStatusController,
    createRequestController,
    getRequestController,
    getUserRequestController,
} from "../controllers/bookingController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
router.post("/", requireSignIn, createRequestController);

router.get("/", requireSignIn, isAdmin, getRequestController);

router.put("/:id", requireSignIn, isAdmin, changeRequestStatusController);

router.get("/user/:userId", requireSignIn, getUserRequestController);

export default router;
