import { useContext } from "react"
import { postContext } from "../providers/PostProvider"
import Post from "./Post"


const PostList =()=>{
    const {posts} = useContext(postContext)
    return<>
    {
        posts.map(d=>{
            return <Post title={d.title} imageUrl={d.imageUrl} />
        })
    }
    </>
}

export default PostList