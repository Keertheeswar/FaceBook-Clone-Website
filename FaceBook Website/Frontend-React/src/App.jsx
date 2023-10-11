import Home from "./components/Home"
import SignIn from "./components/Signin"
import SignUp from "./components/Signup"
import { AuthProvider } from "./providers/AuthProvider"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PostProvider } from "./providers/PostProvider"
import { Navigate } from "react-router-dom"

const App = () => {


  return <>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <Routes>
            <Route path={"/"} element={<Navigate to="/signin" />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/signin"} element={<SignIn />} />
          </Routes>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </>
}

export default App