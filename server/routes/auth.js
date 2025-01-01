
import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import middleWare from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if(user){
        return res.status(401).json({success:false,message:"user already exist"});
    }
    const hashPassword =await bcrypt.hash(password,10);

    const newUser = new User({
        name,email,password :hashPassword
    });
    await newUser.save()

    return res.status(200).json({success: true,message: "Account createed Successfully"});

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({success: false,message: "Error in adding user"});
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return res.status(401).json({success:false,message:"user doesn't exist"});
    }
    
    const checkPassword = await bcrypt.compare(password,user.password);
    if(!checkPassword){
      return res.status(401).json({success:false,message:"wrong credentials"});
    }

    const token = jwt.sign({id:user._id},"secreatKeyOfNoteApp123@#",{expiresIn: "5hr"})
    
    return res.status(200).json({success: true, token,user : {name : user.name},message: "Login Successfully"});

  } catch (error) {
    
    return res.status(500).json({success: false,message: "Error in Login user"});
  }
});

router.get('/verify',middleWare,async (req,res)=>{
   res.status(200).json({success: true , user: req.user})
})

export default router;
