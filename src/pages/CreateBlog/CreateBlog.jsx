import { useForm } from "react-hook-form";
import axios from "../../utils/axiosInstance.js";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/index.jsx";

const CreateBlog = () => {
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("blog/create", data, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      toast.success("Blog created.", { autoClose: 5000 });
      console.log("Blog created.", response.data);
      navigate(`/post/${response.data.blog._id}`);
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("An error occurred while creating the blog.", {
        autoClose: false,
      });
    } finally {
      setLoading(false);
      reset();
    }
  };

  const handleMaxLengthExceeded = (fieldName, maxLength) => {
    return (
      errors[fieldName] &&
      errors[fieldName].type === "maxLength" && (
        <span className="text-danger me-2">
          {fieldName} exceeds maximum length of {maxLength} characters.
        </span>
      )
    );
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Title
          </label>
          <input
            {...register("title", { required: true, maxLength: 100 })}
            type="text"
            className="form-control"
            placeholder="Blog title..."
          />
          {handleMaxLengthExceeded("title", 100)}
          {errors.title && <span className="text-danger">This field is required</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label fw-semibold">
            Author
          </label>
          <input
            {...register("author", { required: true, maxLength: 50 })}
            type="text"
            className="form-control"
            placeholder="Your name..."
          />
          {handleMaxLengthExceeded("author", 50)}
          {errors.author && <span className="text-danger">This field is required</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label fw-semibold">
            Content
          </label>
          <textarea
            {...register("content", { required: true, maxLength: 3000 })}
            rows="5"
            className="form-control"
            placeholder="Write your blog here..."
          />
          {handleMaxLengthExceeded("content", 3000)}
          {errors.content && <span className="text-danger">This field is required</span>}
        </div>
        <button type="submit" className="btn btn-primary rounded-pill px-5 fw-semibold" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
