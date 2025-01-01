import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const middleWare = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(401).json({success:false,message : "Unauthorized"})
        }

        const decoded = jwt.verify(token ,"secreatKeyOfNoteApp123@#");

        if(!decoded){
            return res.status(401).json({success:false,message : "wrong token"})
            
        }

        const user = await User.findById({_id: decoded.id});

        if(!user){
            return res.status(404).json({success:false,message : "No User"});
        }

        const newUser = {name: user.name,id:user._id};
        req.user= newUser;
        next()

    } catch {
        return res.status(500).json({success:false,message : "please Login"});

    }

}

export default middleWare;