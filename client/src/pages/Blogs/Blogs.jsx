import React, { useEffect, useState, Suspense } from "react";
import axios from "../../utils/axiosInstance.js";
import Loading from "../../components/Loading/Loading.jsx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { BsSearch } from "react-icons/bs";

const LazyBlog = React.lazy(() => import("../Blog/Blog.jsx"));

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("Authorization")}`;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchBlogs = async (keyword) => {
    setLoading(true);

    try {
      const res = await axios.get(keyword ? `blog/search?keyword=${keyword}` : "");
      setBlogs(res?.data?.blogs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const delayedFetchBlogs = (value) => {
    const lowerCaseKeyword = value.toLowerCase();
    setSearchKeyword(lowerCaseKeyword);
    fetchBlogs(lowerCaseKeyword);
  };

  const handleInputChange = (value) => {
    clearTimeout(delayedFetchBlogs.timeout);
    delayedFetchBlogs.timeout = setTimeout(() => delayedFetchBlogs(value), 100);
  };

  useEffect(() => {
    fetchBlogs(searchKeyword);
  }, [searchKeyword]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`blog/post/${id}`);
        toast.success("Blog deleted successfully");
        fetchBlogs(searchKeyword);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while deleting the blog");
      }
    }
  };

  return (
    <div className="container my-3">
      <div className="mb-3 input-group">
        <span className="input-group-text">
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search blogs..."
          className="form-control"
          value={searchKeyword}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <Suspense fallback={<Loading />}>
            {blogs?.length > 0 ? (
              blogs?.map((blog) => (
                <LazyBlog key={blog._id} blog={blog} onDelete={handleDelete} />
              ))
            ) : (
              <p>No blogs found for the given keyword.</p>
            )}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default Blogs;
