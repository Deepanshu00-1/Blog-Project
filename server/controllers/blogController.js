// create blog

import BlogModel from "../models/BlogModel.js";
import UserModel from "../models/UserModel.js";

export const createBlog = async (req, res) => {
  const { title, content, createdAt, createdBy, userId } = req.body;
  if (!title || !content) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const user = await UserModel.findOne({ userId });
    const blog = new BlogModel({ title, content, createdBy: user.name });
    await blog.save();
    return res.json({ success: true, message: "Blog created ✔" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// update blog

export const updateBlog = async (req, res) => {
  const { title, content, createdAt, createdBy, userId } = req.body;
  if (!title || !content) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const id = req.params.id;
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "No such blog found!" });
    }
    blog.title = req.body.title;
    blog.content = req.body.content;
    await blog.save();
    return res.json({ success: true, message: "Blog updated successfully ✔" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// get blog

export const getBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog= await BlogModel.findById(id)
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    return res.json({success: true, blog})
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// delete blog

export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    await BlogModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Blog Deleted Successfully ✔" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// read blog

export const readBlog = async (req, res) => {
  try {
    BlogModel.find({})
      .then((blogs) => res.json(blogs))
      .catch((err) => res.json(err));
  } catch (error) {
    return res.json({ success: true, message: error.message });
  }
};
