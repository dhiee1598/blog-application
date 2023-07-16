import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();

  const {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/blogs/${id}`);

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
          <p className="leading-6 text-md">{blog.body}</p>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
