import bookingRequestModel from "../models/bookingRequestModel.js";

export const createRequestController = async (req, res) => {
    try {
        // get data from req body
        const { date, roomId, userId } = req.body;

        // validations for req body
        if (!date) {
            return res.status(400).send({
                success: false,
                message: "Date is Required",
            });
        }
        if (!roomId) {
            return res.status(400).send({
                success: false,
                message: "RoomId is Required",
            });
        }

        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "userId is Required",
            });
        }

        // Check if the room is already booked for the requested date
        const existingBooking = await bookingRequestModel.findOne({
            roomId,
            date,
            status: "accepted",
        });
        if (existingBooking) {
            return res.status(409).json({
                error: "Room is already booked for the requested date.",
            });
        }
        const bookingRequest = await new bookingRequestModel({
            date,
            roomId,
            userId,
        }).save();

        res.status(201).send({
            success: true,
            message: "Booking Request Sent Successfully",
            bookingRequest,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in sending booking request",
        });
    }
};

export const getRequestController = async (req, res) => {
    try {
        const bookingRequests = await bookingRequestModel
            .find()
            .populate("roomId")
            .populate("userId")
            .sort({ createdAt: -1 });

        res.status(201).send({
            success: true,
            message: "Booking Requests",
            bookingRequests,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting all booking requests",
        });
    }
};

export const changeRequestStatusController = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).send({
                success: false,
                message: "status is Required",
            });
        }

        const bookingRequest = await bookingRequestModel.findByIdAndUpdate(
            requestId,
            { status }
        );

        if (status === "accepted") {
            await bookingRequestModel.updateMany(
                {
                    roomId: bookingRequest.roomId,
                    status: "pending",
                    _id: { $ne: requestId },
                },
                { status: "rejected" }
            );
        }

        res.status(201).send({
            success: true,
            message: "Booking Request Status Update",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in changing status of booking request",
        });
    }
};

export const getUserRequestController = async (req, res) => {
    try {
        const userId = req.params.userId;

        const bookingRequests = await bookingRequestModel
            .find({ userId })
            .populate("roomId")
            .populate("userId")
            .sort({ createdAt: -1 });

        res.status(201).send({
            success: true,
            message: "Users Booking Requests",
            bookingRequests,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting all booking requests of user",
        });
    }
};
