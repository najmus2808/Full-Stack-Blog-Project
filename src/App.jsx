import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import "./index.css";
import ProtectedRoutes from "./ProtectedRoutes";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Login = lazy(() => import("./pages/Login/Login"));
const Registration = lazy(() => import("./pages/Registration/Registration"));
const Blogs = lazy(() => import("./pages/Blogs/Blogs"));
const SingleBlog = lazy(() => import("./pages/SingleBlog/SingleBlog"));
const CreateBlog = lazy(() => import("./pages/CreateBlog/CreateBlog"));
const UpdateBlog = lazy(() => import("./pages/UpdateBlog/UpdateBlog"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {

  return (
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
  );
}

export default App;
