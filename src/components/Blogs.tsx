import Blog from "./Blog";
import { useState, useEffect } from "react";

const Blogs = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/blogs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, []);

  return (
    <div className="w-4/5 min-h-screen m-auto p-5">
      {items && <Blog items={items} title="All Blogs" />}
    </div>
  );
};

export default Blogs;
