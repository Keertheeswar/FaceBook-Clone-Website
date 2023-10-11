import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";


const postContext = createContext()

const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([])

    const { auth } = useContext(authContext)

    const createPost = async (title, imageUrl) => {
        await fetch("http://localhost:8000/posts/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": auth
            },
            body: JSON.stringify({
                title: title,
                imageUrl: imageUrl
            })
        })
        getPosts()
    }

    const getPosts = async () => {
        const res = await fetch("http://localhost:8000/posts/post",{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": auth
            }
        })
        const data = await res.json()
        const newPosts = data.map(d => {
            return {
                title: d.title,
                imageUrl: d.imageUrl,
                id:d._id
            }
        })
        setPosts(newPosts)
       
    }

    useEffect(() => {
        if(!auth){
            return 
        }
        getPosts()
    }, [auth])

    return <>
        <postContext.Provider value={{ createPost, getPosts, setPosts, posts }}>
            {children}
        </postContext.Provider>
    </>
}

export { postContext, PostProvider }