import {React, useContext, useState} from "react";
import "./createBlog.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
const CreateBlog = ()=>{

    const {backendUrl} = useContext(AppContext)

    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const navigate = useNavigate()

    const createBlog = async(e)=>{
        e.preventDefault();
        const {data} = await axios.post(backendUrl + '/api/blog/create-blog', {title, content})
            
            if(data.success){
                navigate('/blogs')
                toast.success(data.message)
                console.log(data)
            }else{
                toast.error(data.message)
            }
    }

    return(
        <>
        <div className="main-create">
            <h1>Add Blog Here...</h1>
            <form className="create-form" onSubmit={createBlog}>
                <label htmlFor="">Title</label>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} /><br />
                <label htmlFor="">Content</label>
                <textarea name="" id="" onChange={e => setContent(e.target.value)} value={content} ></textarea><br />
                {/* <label htmlFor="">Image</label>
                <input type="file" onChange = {e => setImage(e.target.value)} /><br /><br /> */}
                <button className="">Submit</button>
            </form>
        </div>
        </>
    )
}
export default CreateBlog;