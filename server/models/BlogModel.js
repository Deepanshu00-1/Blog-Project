import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.String,
        ref: 'users'
    }
});
const BlogModel = mongoose.model("blogs", BlogSchema);

export default BlogModel;