import mongoose from "mongoose";

const ConnectDB = async()=>{
    const conn = await mongoose.connect("mongodb+srv://krrohan129:wYN9Uda78KpSKUw9@cluster0.pssfh.mongodb.net/MERN-BLOG?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected", conn.connection.host);
}
export default ConnectDB;
// wYN9Uda78KpSKUw9