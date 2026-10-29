import express from "express"
import { userModel } from "../modles/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { tokenBlockListModel } from "../modles/blackModel.js";

// export const userResgister = async (req, res) => {

//     try {
//         const { username, email, password } = req.body
//         if (!username || !email || !password) {
//             return res.status(400).json({
//                 message: "All field required",
//                 success: false
//             })
//         }
//         const userAlreadtExists = await userModel.findOne({
//             $or: [
//                 { username }, { email }
//             ]

//         })
//         if (userAlreadtExists) {
//             return res.status(401), {
//                 message: "Aleready exists",
//                 success: false

//             }
//         }
//         const hash = await bcrypt.hash(password, 10)
//         const newUser = await userModel.create({
//             username,
//             email,
//             password: hash
//         })
//         const token = jwt.sign(
//             {
//                 id: user._id,
//                 userName: user.username
//             },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         )
//         res.cookie("token", token)
//         res.status(200).json({
//             message: "User is generated",
//             success: true
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })


//     }


// }


export const userResgister = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const userAlreadyExists = await userModel.findOne({
            $or: [{ userName }, { email }]
        });

        if (userAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: "Username or email already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            userName,
            email,
            password: hash
        });

        const token = jwt.sign(
            {
                id: newUser._id,
                username: newUser.userName
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// export const userLogin=async (req,res) => {
//     const {email,password}=req.body

//     const isMatch=await userModel.findOne({email})
      
//     if(!isMatch){
//         return res.status(400).json({
//             success:false,
//             message:"Invalid or password"
//         })
//     }

//     const isPasswordMatched=await bcrypt.compare(password,user.password)

//     if(!isPasswordMatched){
//         return res.status(401).json({
//             success:false,
//             message:"Unauthorized Password"
//         })
//     }

//      const token = jwt.sign(
//             {
//                 id: user._id,
//                 userName: user.username
//             },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         )
//         res.cookie("token", token)
//         res.status(200).json({
//             message: "User is Logged in ",
//             success: true
//         })

    
// }



export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                userName: user.userName
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



export const userLogout=async (req,res) => {
    const token =req.cookie.token

    if(token){
        await tokenBlockListModel.create({token})
    }

    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out successfully"
    })
    
}