import {React, useContext, useEffect, useState} from "react";
import "./updateBlog.css"
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBlog = ()=>{
    const {backendUrl} = useContext(AppContext)
    const {id} =  useParams();
    const [title, setTitle] = useState();
    const [content, setContent] = useState()

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('https://blog-project-server-bdn5.onrender.com' + `/api/blog/get-blog/${id}`)
        .then(result => {
            setTitle(result.data.blog.title)
            setContent(result.data.blog.content)
            console.log(result)
        })
        .catch(err => console.log(err))
    },[])

    const update = (e)=>{
        e.preventDefault()
        axios.put(backendUrl + `/api/blog/update-blog/${id}`, {title, content})
        .then(result => {
            if(result.success = true){
                navigate("/blogs")
            }
            toast.success(result.data.message)
            console.log(result)
        })
        .catch(err => console.log(err))
    }

    return(
        <>
        <div className="main-update">
            <h1>Update Blog Here...</h1>
            <form className="update-form" action="" onSubmit={update}>
                <label htmlFor="">Topic</label>
                <input type="text" value={title} onChange={e=> setTitle(e.target.value)} /><br />
                <label htmlFor="">Descryption</label>
                <textarea name="" id="" value={content} onChange={e=> setContent(e.target.value)} ></textarea><br />
                {/* <label htmlFor="">Image</label>
                <input type="file" /><br /><br /> */}
                <button>Update</button>
            </form>
        </div>
        </>
    )
}
export default UpdateBlog;
