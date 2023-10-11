import { createContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const authContext = createContext()


const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [auth,setAuth]=useState("")
    const signup = async (mailId, password) => {
        await fetch("http://localhost:8000/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mailId: mailId,
                password: password
            })
        })
        navigate("/signin")
    }

    const signin = async (mailId, password) => {
        const res =await fetch("http://localhost:8000/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mailId: mailId,
                password: password
            })
        })
        setAuth(res.headers.get("authorization"))
        console.log(auth)
        console.log("signin successful")
        navigate("/home")
    }

    

    return <>
        <authContext.Provider value={{signup,auth,setAuth,signin}}>
            {children}
        </authContext.Provider>
    </>
}

export { AuthProvider, authContext }
