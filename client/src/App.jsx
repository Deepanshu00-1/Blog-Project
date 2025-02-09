import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { ToastContainer, toast } from "react-toastify";
import Blogs from "./Blogs/Blogs.jsx";
import CreateBlog from "./CreateBlog/CreateBlog.jsx";
import UpdateBlog from "./UpdateBlog/UpdateBlog.jsx";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/update-blog/:id" element={<UpdateBlog />} />
      </Routes>
    </div>
  );
}

export default App;
