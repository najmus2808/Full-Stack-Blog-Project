import { useForm } from "react-hook-form";
import axios from "../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext.js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state variable
  const { isAdmin, setLoggedIn, setUsername } = useContext(AuthContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("user/login", data);

      if (response?.data?.user?.role === 1) {
        isAdmin(true);
      }

      if (response?.data?.error) {
        toast.error(response?.data?.error);
      }
      if (response?.data?.token) {
        toast.success("Welcome back");
        localStorage.setItem("Authorization", response?.data?.token);
        setLoggedIn(true);
        setUsername(response?.data?.user?.username);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="mb-5">Login</h1>
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
          <div className="input-group">
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"} // Toggle the input type
              className="form-control"
              placeholder="Enter password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)} // Toggle the state
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success px-5 fw-semibold rounded-pill"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <hr />
      <p>
        Don&apos;t have an account? <Link to="/registration">Register</Link>
      </p>
    </div>
  );
};

export default Login;
