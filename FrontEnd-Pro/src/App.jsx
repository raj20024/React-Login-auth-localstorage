
import { Routes, Route } from "react-router-dom";
import Header from './Component/Header'
import Home from './Component/Home'
import NoPage from './Component/NoPage';
import Profile from './Component/Profile';
import Contact from './Component/Contact';
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Checkbox from "./Component/Checkbox";
import Redirect from "./Component/Redirect";
import FormikTest from "./Component/FormikTest";
import PrivateComponent from "./Component/PrivateComponent";


function App() {
  return (
    <>
      <Header />
      <Routes>
      <Route  element={<PrivateComponent />} >
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="formik" element={<FormikTest />} />
       
       
        <Route path="/checkbox" element={<Checkbox />} />
        <Route path="/ridrect" element={<Redirect />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NoPage />} />
      </Routes>

    </>
  )
}

export default App
