import { useForm } from "react-hook-form";
import axios from "../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.username.includes(" ")) {
        toast.error("Username cannot contain spaces.");
      }
      if (data.username.length > 20) {
        toast.error("Username cannot be longer than 20 characters.");
      } else {
        const response = await axios.post("user/register", data);
        if (response?.data?.error) {
          toast.error(response?.data?.error);
          console.log(response?.data?.error);
        } else {
          toast.success("Registered successfully");
          navigate("/login");
        }
        console.log(response?.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="mb-5">Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label fw-semibold"
          >
            Username
          </label>
          <input
            {...register("username", { required: true })}
            type="text"
            className="form-control"
            placeholder="Enter username"
          />
          {errors.username && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-semibold"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
          {errors.password && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary px-5 fw-semibold rounded-pill"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <hr />

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Registration;
