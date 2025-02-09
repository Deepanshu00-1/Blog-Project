import express from "express"
import { createBlog, deleteBlog, getBlog, readBlog, updateBlog} from "../controllers/blogController.js";
import userAuth from "../middleware/userAuth.js";


const blogRouter = express.Router();

blogRouter.post("/create-blog", createBlog)
blogRouter.get("/get-Blog/:id", getBlog)
blogRouter.put("/update-blog/:id", updateBlog)
blogRouter.delete("/delete-blog/:id", deleteBlog)
blogRouter.get("/blogs", readBlog)


export default blogRouter;
