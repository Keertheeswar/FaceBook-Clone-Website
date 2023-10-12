import { Link } from "react-router-dom"

const Navbar =()=>{
    return <>
        <div>
            <Link to='/home'>Home</Link>
            <Link to='/friend'>Friends</Link>
            <Link to='profile'>Profile</Link>
            <Link to='/'>Logout</Link>
        </div>
    </>
}

export default Navbar