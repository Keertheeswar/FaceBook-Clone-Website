import { useContext, useState } from "react"
import { postContext } from "../providers/PostProvider"
import PostList from "./PostList"


const Home =()=>{
    const [title,setTitle]= useState("")
    const [imageUrl,setimageUrl]=useState("")
    const {createPost,getPosts}= useContext(postContext)

    const handleChangeTitle=(e)=>{
        setTitle(e.target.value)
    }
    const handleChangeImageUrl=(e)=>{
        setimageUrl(e.target.value)
    }
    const onClickPost =()=>{
        createPost(title,imageUrl)
        setTitle("")
        setimageUrl("")
    }
    getPosts()
    return<>
    <input type="text" onChange={handleChangeTitle} value={title} />
    <input type="text" onChange={handleChangeImageUrl} value={imageUrl} />
    <button onClick={onClickPost}>Create Post</button>
    <PostList/>
    </>
}

export default Home