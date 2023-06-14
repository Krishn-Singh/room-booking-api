import mongoose from "mongoose";

const bookingRequestSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        roomId: {
            type: mongoose.ObjectId,
            ref: "Rooms",
            required: true,
        },
        userId: {
            type: mongoose.ObjectId,
            ref: "users",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model('BookingRequest', bookingRequestSchema);
