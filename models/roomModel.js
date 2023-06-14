import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "Available",
            enum: ["Available", "Unavailable"],
        },
        image: {
            type: String,
            // required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Rooms", roomSchema);
