import { createContext, useContext, useEffect, useState } from "react"
import { authContext } from "./AuthProvider"

const friendContext = createContext()


const FriendProvider = ({ children }) => {
    const [friends, setFriends] = useState([])
    const { auth } = useContext(authContext)
    const getUsers = async () => {
        const res = await fetch("http://localhost:8000/friends/friend", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": auth
            }
        })
        const data = await res.json()
        
        const friends1 = data.map(d => {
            return {mailId:d.mailId,id:d._id}
        })
        console.log(friends1)
        setFriends(friends1)

    }
    useEffect(() => {
        if (!auth) {
            return
        }

        getUsers()
    }, [auth])

    return <>
        <friendContext.Provider value={{ friends, setFriends }}>
            {children}
        </friendContext.Provider>
    </>
}

export {friendContext,FriendProvider}