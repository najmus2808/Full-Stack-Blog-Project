/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axiosInstance.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading.jsx";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/index.jsx";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("Authorization")}`;

const UpdateBlog = () => {
  const { state } = useContext(AuthContext);

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`blog/post/${id}`);
        const { title, author, content } = response.data.blog;
        setValue("title", title);
        setValue("author", author);
        setValue("content", content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      setUpdating(true);
      toast.info("Updating blog..."); // Show loading toast

      await axios.put(`blog/edit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${state?.token}`,
        },
      });
      toast.dismiss();
      toast.success("Blog updated successfully", { autoClose: 3000 });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the blog");
    } finally {
      setUpdating(false);
      navigate("/"); // Navigate to home page after updating
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

  let content = null;

  if (loading) {
    content = <Loading />;
  } else {
    content = (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Title
            </label>
            <input {...register("title", { required: true, maxLength: 100 })} type="text" className="form-control" />
            {handleMaxLengthExceeded("title", 100)}
            {errors.title && <span className="text-danger">This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label fw-semibold">
              Author
            </label>
            <input {...register("author", { required: true, maxLength: 50 })} type="text" className="form-control" />
            {handleMaxLengthExceeded("author", 50)}
            {errors.author && <span className="text-danger">This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label fw-semibold">
              Content
            </label>
            <textarea {...register("content", { required: true, maxLength: 3000 })} rows="5" className="form-control" />
            {handleMaxLengthExceeded("content", 3000)}
            {errors.content && <span className="text-danger">This field is required</span>}
          </div>

          <Link to="/" className="btn btn-outline-secondary rounded-pill me-2">
            Back to Blog
          </Link>

          <button type="submit" className="btn btn-primary px-5 fw-semibold rounded-pill" disabled={updating}>
            {updating ? "Updating..." : "Save and publish"}
          </button>
        </form>
      </div>
    );
  }

  return <div className="container my-3">{content}</div>;
};

export default UpdateBlog;
