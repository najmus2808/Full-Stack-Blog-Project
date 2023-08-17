/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import placeholder from "../../assets/placeholder.png";
import Filter from "bad-words";

const Blog = ({ blog, onDelete }) => {
  const { title, content, author, _id } = blog;

  const { admin } = useContext(AuthContext);

  const filter = new Filter();
  const censoredTitle = filter.clean(title);
  const censoredAuthor = filter.clean(author);
  const censoredContent = filter.clean(content);

  return (
    <div className="col">
      <div className="card h-100">
        <Link to={`/post/${_id}`}>
          <img
            src={placeholder}
            className="card-img-top img-fluid"
            style={{ height: "200px", objectFit: "cover" }}
            alt="..."
          />
        </Link>
        <div className="card-body">
          <div className="py-2 d-flex align-items-center">
            <picture className="me-2">
              <FaRegUserCircle size={23} />
            </picture>
            <span className="text-truncate">{censoredAuthor}</span>
          </div>
          <Link to={`/post/${_id}`} className="link">
            <h5 className="card-title fw-bold">{censoredTitle}</h5>
            <p
              className="card-text d-inline-block text-truncate"
              style={{ maxWidth: "250px" }}
            >
              {censoredContent}
            </p>
          </Link>

          {admin && (
            <div className="d-flex gap-2">
              <Link to={`/edit/${_id}`} className="link">
                <button className="d-flex align-items-center btn btn-secondary gap-1">
                  <IoCreateOutline size={23} /> Edit Blog
                </button>
              </Link>

              <button
                onClick={() => onDelete(_id)}
                className="btn btn-danger d-flex align-items-center gap-1"
              >
                <RiDeleteBinLine size={23} /> Delete Blog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
