import { useContext } from "react"
import { friendContext } from "../providers/FriendProvider"
import Friend from "./Friend"



const FriendList = () => {
    const { friends } = useContext(friendContext)
    console.log(friends)
    return <>
        <p>Friends:</p>
        
        {
            friends.map(d => {
                return <Friend mailId={d.mailId} id={d.id} key={d.id}/>
            }) 
        }
    </>
}

export default FriendList

