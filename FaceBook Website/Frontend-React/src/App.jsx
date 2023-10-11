import Home from "./components/Home"
import SignIn from "./components/Signin"
import SignUp from "./components/Signup"
import { AuthProvider } from "./providers/AuthProvider"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PostProvider } from "./providers/PostProvider"
import { Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import { ProfileProvider } from "./providers/ProfileProvider"

const App = () => {


  return <>

    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <ProfileProvider>
            <Navbar />
            <Routes>
              <Route path={"/"} element={<Navigate to="/signin" />} />
              <Route path={"/home"} element={<Home />} />
              <Route path={"/profile"} element={<Profile />} />
              <Route path={"/signup"} element={<SignUp />} />
              <Route path={"/signin"} element={<SignIn />} />
            </Routes>
          </ProfileProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </>
}

export default App