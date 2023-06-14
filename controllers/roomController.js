import roomModel from "../models/roomModel.js";

export const createRoomController = async (req, res) => {
    try {
        // save images
        let image = req.file ? req.file.filename : "";

        // get data from req body
        const { name, price } = req.body;

        // validations for req body
        switch (true) {
            case !name:
                return res
                    .status(400)
                    .send({ success: false, error: "Name is Required" });
            case !price:
                return res
                    .status(400)
                    .send({ success: false, error: "Price is Required" });
            // case !image:
            //     return res.status(400).send({
            //         success: false,
            //         error: "image is Required",
            //     });
        }

        const room = await new roomModel({
            name,
            price,
            image,
        }).save();

        res.status(201).send({
            success: true,
            message: "Room Created Successfully",
            room,
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            error,
            message: "Error in creating room",
        });
    }
};

export const getSingleRoomController = async (req, res) => {
    try {
        const room = await roomModel.findOne({ _id: req.params.id });

        res.status(200).send({
            success: true,
            message: "Single Room Fetched",
            room,
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error while getting single room",
            error,
        });
    }
};

export const deleteRoomController = async (req, res) => {
    try {
        await roomModel.findByIdAndDelete(req.params.id);

        // return response
        res.status(200).send({
            success: true,
            message: "Room Deleted successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error while deleting room",
            error,
        });
    }
};

export const updateRoomController = async (req, res) => {
    try {
        const id = req.params.id;

        // get data from req body
        const { name, price } = req.body;

        // validations for req body
        switch (true) {
            case !name:
                return res
                    .status(400)
                    .send({ success: false, error: "Name is required" });
            case !price:
                return res
                    .status(400)
                    .send({ success: false, error: "Price is required" });
        }

        // find product by id
        const room = await roomModel.findById(id);

        if (!room) {
            return res
                .status(404)
                .send({ success: false, error: "Room not found" });
        }

        room.name = name;
        room.price = price;

        const updatedRoom = await room.save();

        res.status(200).send({
            success: true,
            message: "Room updated successfully",
            room: updatedRoom,
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            error,
            message: "Error in updating room",
        });
    }
};


export const getRoomController = async (req, res) => {
    try {
        const rooms = await roomModel
            .find({})
            .sort({ createdAt: -1 });

        // return response with products
        res.status(200).send({
            success: true,
            message: "All Rooms ",
            rooms,
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Erorr in getting rooms",
            error: error,
        });
    }
};