import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";


const profileContext = createContext()

const ProfileProvider =({children})=>{
    const {auth} = useContext(authContext)
    const [mailId1,setMailId] = useState("")
    const getProfile = async () => {
        const res = await fetch("http://localhost:8000/profiles/profile",{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": auth
            }
        })

        const data = await res.json()
        const mailId =data.mailId  
        console.log(mailId)
        setMailId(mailId)
    }

    useEffect(() => {
        if(!auth){
            return 
        }
        getProfile()
    }, [auth])

    return<>
     <profileContext.Provider value={{mailId1,setMailId}}>
            {children}
        </profileContext.Provider>
    </>
    
}
export {profileContext,ProfileProvider}