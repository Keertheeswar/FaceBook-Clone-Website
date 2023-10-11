import { useContext, useState } from "react"
import { authContext } from "../providers/AuthProvider"
import { Link } from "react-router-dom"

const SignUp =()=>{
    const {signup} = useContext(authContext)
    const [mailId,setmailId]= useState("")
    const [password,setPassword]=useState("")

    const handleChangeMailId =(e)=>{
        setmailId(e.target.value)
    }
    const handleChangePassword =(e)=>{
        setPassword(e.target.value)
    }
    const onSignup =()=>{
        signup(mailId,password)
        setmailId("")
        setPassword("")
    }

    return<>
    <input type="text" onChange={handleChangeMailId} value={mailId}/>
    <input type="password" onChange={handleChangePassword} value={password} />
    <button onClick={onSignup}>Signup</button>
    <p>aldready a user?</p>
        <Link to="/signin">
            <button>signin</button>
        </Link>
    </>
}

export default SignUp