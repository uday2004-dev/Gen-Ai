import jwt from "jsonwebtoken"
import { tokenBlockListModel } from "../modles/blackModel.js"

export const  authUser=async (req,res,next) => {

         const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                message:"Token not provide"
            })
        }

        const isTokenNotBlackList=await tokenBlockListModel.findOne({
            token  
        })
        if(isTokenNotBlackList){
            return res.status(401).json({
                message:"Token is Blacklisted. Please login again"
            })
        }
  
    try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
    next()

    } catch (error) {
        return res.status(401).json({
            message:"Invalid token",
             
        })
    }
    
}

// import jwt from "jsonwebtoken";
// import { tokenBlockListModel } from "../modles/blackModel.js";

// export const authUser = async (req, res, next) => {
//     try {
//         const token = req.cookies?.token;

//         if (!token) {
//             return res.status(401).json({
//                 message: "Token not provided"
//             });
//         }

//         const isBlacklisted = await tokenBlockListModel.findOne({
//             token
//         });

//         if (isBlacklisted) {
//             return res.status(401).json({
//                 message: "Token is blacklisted. Please login again"
//             });
//         }

//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         req.user = decoded;
//         next();

//     } catch (error) {
//         console.log("AUTH ERROR:", error.name, error.message);

//         return res.status(401).json({
//             message: "Invalid token"
//         });
//     }
// };