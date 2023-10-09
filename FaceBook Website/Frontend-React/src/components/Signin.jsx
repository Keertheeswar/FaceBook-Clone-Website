import { useContext, useState } from "react"
import { authContext } from "../providers/AuthProvider"


const SignIn =()=>{
    const {signin} = useContext(authContext)
    const [mailId,setmailId]= useState("")
    const [password,setPassword]=useState("")

    const handleChangeMailId =(e)=>{
        setmailId(e.target.value)
    }
    const handleChangePassword =(e)=>{
        setPassword(e.target.value)
    }
    const onSignin =()=>{
        signin(mailId,password)
        setmailId("")
        setPassword("")
    }

    return<>
    <input type="text" onChange={handleChangeMailId} value={mailId}/>
    <input type="password" onChange={handleChangePassword} value={password} />
    <button onClick={onSignin}>Signin</button>
    </>
}

export default SignIn