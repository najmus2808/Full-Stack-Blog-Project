import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "../../utils/axiosInstance.js";
import formatDate from "../../utils/formattedDate.js";
import { AuthContext } from "../../AuthContext/AuthContext.js";
import Filter from "bad-words";
import placeholder from "../../assets/placeholder.png";


axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("Authorization")}`;
const SingleBlog = () => {
  const { id } = useParams();
  const [blogAndComments, setBlogAndComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const { username, admin } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      try {
        const blogResponse = await axios.get(`blog/post/${id}`);
        const commentsResponse = await axios.get(`comment/getCommentByPostId/${id}`);

        setBlogAndComments({
          blog: blogResponse?.data?.blog,
          comments: commentsResponse?.data,
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndComments();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`comment/createCommentByPostId/${id}`, {
        text: commentText,
        username,
      });

      // Update the local state with the new comment
      setBlogAndComments((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, response.data],
      }));

      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { blog, comments } = blogAndComments;

  const filter = new Filter();
  const censoredTitle = filter.clean(blog?.title);
  const censoredContent = filter.clean(blog?.content);
  const censoredAuthor = filter.clean(blog?.author);

  console.log("comment?.createdAt", comments);

  // Reverse the comments array to show the last added comment at the top
  const reversedComments = comments.slice().reverse();

  return (
    <div className="container my-3">
      <div className="card mb-3">
        <img
          src={placeholder}
          className="card-img-top img-fluid"
          alt="..."
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <div className="py-2">
            <picture className="me-2">
              <FaRegUserCircle size={23} />
            </picture>
            <span>{censoredAuthor}</span>
          </div>
          <h5 className="card-title fw-bold display-3" style={{ color: "#242424" }}>
            {censoredTitle}
          </h5>
          <p className="card-text">{censoredContent}</p>

          {blog?.createdAt && (
            <p className="card-text">
              <small className="text-body-secondary">Published on {formatDate(blog?.createdAt)}</small>
            </p>
          )}

          {admin && blog?.updatedAt && (
            <p className="card-text">
              <small className="text-body-secondary">Updated at {formatDate(blog?.updatedAt)}</small>
            </p>
          )}
        </div>
      </div>

      <div className="row d-flex">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-0 border" style={{ backgroundColor: "#f0f2f5" }}>
            <div className="card-body p-4">
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="addANote"
                  className="form-control"
                  placeholder="Type comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  maxLength={200}
                />
                <button
                  className="btn btn-success rounded-pill btn-sm mt-2"
                  onClick={handleAddComment}
                  disabled={!commentText}
                >
                  + Add a comment
                </button>
              </div>

              {reversedComments && reversedComments.length > 0 && (
                <div>
                  {reversedComments.map((comment) => {
                    const filter = new Filter();
                    const censoredText = filter.clean(comment?.text);
                    const censoredUsername = filter.clean(comment?.username);

                    return (
                      <div key={comment?._id} className="card mb-4">
                        <div className="card-body">
                          <p>{censoredText}</p>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <FaRegUserCircle size={35} />
                              <div>
                                <p className="small mb-0 ms-2">{formatDate(comment?.createdAt)}</p>
                                <p className="small mb-0 ms-2">{censoredUsername}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
