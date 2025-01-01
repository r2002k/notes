import express from 'express'
import Note from '../models/Note.js';
import middleWare from '../middleware/middleware.js';

const router = express.Router();

router.post('/add',middleWare,async (req,res)=>{
    try {
        const { title,description } = req.body;
        
        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        });
        await newNote.save()
    
        return res.status(200).json({success: true,message: "Note createed Successfully"});
    
      } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false,message: "Error in adding Note"});
      }

})

router.get('/',middleWare, async (req,res)=>{
    try {
        const notes = await Note.find({userId: req.user.id});
        return res.status(200).json({success : true, notes})
    }
    catch(error){
        res.status(500).json({success: false, message : "Can't retrive the notes"})
    }
})

router.put("/:id",async (req,res)=>{
    try{
        const {id}= req.params;
        const updateNote = await Note.findByIdAndUpdate(id,req.body)
        return res.status(200).json({success : true, updateNote})
    }
    catch(error){
        res.status(500).json({success: false, message : "Can't update the note"})
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const {id}= req.params;
        const updateNote = await Note.findByIdAndDelete(id)
        return res.status(200).json({success : true, updateNote})
    }
    catch(error){
        res.status(500).json({success: false, message : "Can't update the note"})
    }
})

export default router;