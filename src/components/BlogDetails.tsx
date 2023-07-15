import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);

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
    </div>
  );
};

export default BlogDetails;
