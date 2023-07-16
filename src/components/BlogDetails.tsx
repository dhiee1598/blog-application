import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/blogs/${id}`);

  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="w-4/5 min-h-screen m-auto p-5">
      {isPending && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
      {blog && (
        <div>
          <h1 className="text-5xl mb-3">{blog.title}</h1>
          <h3 className="text-red-600 text-lg mb-5 italic">
            Written by: {blog.author}
          </h3>
          <p className="leading-6 text-md mb-3">{blog.body}</p>
          <button
            className="border border-black rounded-md px-6 py-1 bg-red-600 text-white"
            onClick={handleClick}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
