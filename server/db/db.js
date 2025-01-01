import mongoose from 'mongoose';

const connectToMongoDB =async ()=>{
    try{

        await mongoose.connect("mongodb://localhost:27017/note_app");
        console.log("connected to MongoDB")

    }
    catch(error) {
        console.log("error connecting to MongoDB",error.message);
    }
};

export default connectToMongoDB;