import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance.js";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteBlog = () => {
  const history = useHistory();
  const { id } = useParams();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (deleting) {
      const deleteBlog = async () => {
        try {
          await axios.delete(`/post/${id}`);
          toast.success("Blog deleted successfully");
          history.push("/"); // Redirect to homepage or another appropriate route
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting the blog");
        }
      };

      deleteBlog();
    }
  }, [deleting, id, history]);

  const handleDelete = () => {
    setDeleting(true);
  };

  return (
    <div className="container my-3">
      <h1>Delete Blog</h1>
      <p>Are you sure you want to delete this blog?</p>
      <button
        type="button"
        className="btn btn-danger px-5 fw-bold"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteBlog;
