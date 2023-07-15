import Blog from "./Blog";
import useFetch from "../hooks/useFetch";

const Blogs = () => {
  const { data, isPending, error } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="w-4/5 min-h-screen m-auto p-5">
      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
      {isPending && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
      {data && <Blog items={data} title="All Blogs" />}
    </div>
  );
};

export default Blogs;
