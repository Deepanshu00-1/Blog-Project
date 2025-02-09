import { React, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
// import "./blogs.css"
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Blogs = () => {

  const navigate = useNavigate();
  const {backendUrl, setUserData, setIsLoggedin} = useContext(AppContext)

  const [blogs, setBlogs] = useState([]);

  const addPost=(e)=>{
    e.preventDefault();
    navigate("/create-blog")
  }
  // let data;
  useEffect(()=>{
    axios.get(backendUrl + "/api/blog/blogs")
    .then(result => {
      setBlogs(result.data)
      console.log(result)
    })
    .catch(err => alert(err))
  },[])

  const deleteBlog = (id)=>{
    axios.delete('https://blog-project-server-bdn5.onrender.com' + `/api/blog/delete-blog/${id}`)
    .then(result => {
      console.log(result)
      toast.success(result.data.message)
      window.location.reload()
      // toast.success(result.data.message)
    })
    .catch(err => console.log(err))
  }

  const logout = async()=>{
    try {
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + '/api/auth/logout')
        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/')

    } catch (error) {
        toast.error(error.message)
    }
}

  return (
    <>
      <div className="main">
        <header className="header flex h-12 flex items-center justify-around  px-6 sm:px-0 bg-blue-100">
          <h2>Personal Blog</h2>
          <button className="header-btn bg-slate-200 border-1  p-1 rounded-md  cursor-pointer " onClick={logout}>Logout</button>
        </header>
        <div className="blogs  flex h-12 flex  min-h-screen px-6 sm:px-0 bg-white">
          <div className="leftside bg-blue-200 min-h-screen bg-sky-100 w-40 flex flex-col  items-center  gap-25 py-10" >
            <h1 className="text-xl">Add new blog</h1>
            <button className="leftside-btn shadow-2xl text-white hover:text-black hover:bg-blue-300 w-30 py-2.5 rounded-full bg-blue-500 cursor-pointer   " onClick={addPost} >Add +</button>
          </div>
          <div className="rightside flex flex-col justify-start p-10">
            
            
            {blogs.map((blogs,index)=>{
              return (
                <div className="blog shadow-2xl bg-gradient-to-br from-blue-200 to-purple-300 p-4 mb-5 bg-body-tertiary rounded w-5xl" >
                <div className="data flex flex-col" key={index}>
                <div className="info content-fit">
                  <h1>{blogs.title}</h1>
                  <p>{blogs.content}</p>
                </div>
                <div className="action flex justify-around">
                  <div className="actions flex gap-10">
                    <Link to = {`/update-blog/${blogs._id}`}><button className="actions-btn  bg-blue-500 text-white p-1 rounded-md  cursor-pointer">Update</button></Link>
                    <button className=" delete-btn  bg-red-500 text-white  p-1 rounded-md  cursor-pointer" onClick={(e)=>deleteBlog(blogs._id)}>Delete</button>
                  </div>
                  <div className="time">{blogs.createdAt}</div>
                
                </div>
              </div>
              </div> 
              )
            })}
              
          </div>
        </div>
      </div>
    </>
  );
};
export default Blogs;
