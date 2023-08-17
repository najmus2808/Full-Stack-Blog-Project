import { lazy, Suspense, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./AuthContext/AuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import "./index.css";
import Loading from "./components/Loading/Loading";
import axios from "axios";
import { BASE_URL_DEV } from "../secret";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Login = lazy(() => import("./pages/Login/Login"));
const Registration = lazy(() => import("./pages/Registration/Registration"));
const Blogs = lazy(() => import("./pages/Blogs/Blogs"));
const SingleBlog = lazy(() => import("./pages/SingleBlog/SingleBlog"));
const CreateBlog = lazy(() => import("./pages/CreateBlog/CreateBlog"));
const UpdateBlog = lazy(() => import("./pages/UpdateBlog/UpdateBlog"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

axios.defaults.baseURL = BASE_URL_DEV;

function App() {
  const [username, setUsername] = useState(false);
  const [admin, isAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const obj = useMemo(
    () => ({ username, setUsername, admin, isAdmin, loggedIn, setLoggedIn }),
    [username, setUsername, admin, isAdmin, loggedIn, setLoggedIn]
  );

  return (
    <AuthContext.Provider value={obj}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Blogs />} />
              <Route path="/post/:id" element={<SingleBlog />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/edit/:id" element={<UpdateBlog />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
