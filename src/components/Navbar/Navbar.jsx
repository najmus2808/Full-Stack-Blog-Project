import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../Context";

const Navbar = () => {
  const { dispatch, state } = useContext(AuthContext);
  const { isLoggedIn, user } = state;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Blog
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
            ) : null}
            {isLoggedIn ? (
              <li className="nav-item">
                <Link to="/create" className="nav-link d-flex gap-1">
                  <IoCreateOutline size={23} /> Write
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav">
            {!isLoggedIn && (
              <li className="nav-item">
                <Link to="/login" className="nav-link ml-auto">
                  Login
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link to="/registration" className="nav-link ml-auto">
                  Registration
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item mr-auto">
                <Link to="/login" className="nav-link" onClick={handleLogout}>
                  <AiOutlineLogout /> Logout
                </Link>
              </li>
            )}
            {isLoggedIn && <li className="nav-link mr-auto">{user?.username || ""}</li>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
