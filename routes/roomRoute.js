import express from "express";
import {
    createRoomController,
    deleteRoomController,
    getRoomController,
    getSingleRoomController,
    updateRoomController,
} from "../controllers/roomController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import multer from "multer";
import path from "path";

const __dirname = path.resolve();
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(
            null,
            path.join(__dirname, "../ROOM-BOOKING-MAIN/public/roomImages"),
            function (err, success) {
                if (err) {
                    throw err;
                }
            }
        );
    },
    filename: function (req, file, cb) {
        const roomName = Date.now() + "-" + file.originalname;
        cb(null, roomName, function (err, success) {
            if (err) {
                throw err;
            }
        });
    },
});

const upload = multer({ storage: storage });

router.post(
    "/",
    upload.single("image"),
    requireSignIn,
    isAdmin,
    createRoomController
);

router.get("/:id", getSingleRoomController);

router.get("/", getRoomController);

router.delete("/:id", requireSignIn, isAdmin, deleteRoomController);
router.put("/:id", requireSignIn, isAdmin, updateRoomController);

export default router;
