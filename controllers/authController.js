import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        // get data from req body
        const { name, email, password, phone, address } = req.body;

        // validations for req body
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is Required",
            });
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                message: "Password is Required",
            });
        }

        // check user(unique email) if exist or not
        const exisitingUser = await userModel.findOne({ email });

        // if exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }

        // register or save user hash password

        // save user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password,
        }).save();

        // return response with user
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                adddress: user.address,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        // get data from req body
        const { email, password } = req.body;

        // validation for email and password
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Both email and password are required",
            });
        }

        // check user with email
        const user = await userModel.findOne({ email });
        // if user not found - not a registered user
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        // check for password match
        const match = password == user.password ? true : false;
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // generate token
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // return response with user and token
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

// test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};
