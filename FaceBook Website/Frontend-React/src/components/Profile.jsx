import { useContext } from "react"
import { profileContext } from "../providers/ProfileProvider"



const Profile =()=>{
    const {mailId1}=useContext(profileContext)
    

    return<>
    <p>my profile</p>
    <p>{mailId1}</p>
    </>
}
export default Profile