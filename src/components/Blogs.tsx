import Blog from "./Blog";
import { useState } from "react";

const Blogs = () => {
  const [items, setItems] = useState([
    {
      title: "My new website",
      body: "lorem ipsum....",
      author: "Dexter Balderama",
      id: 1,
    },
    {
      title: "Welcome Party",
      body: "lorem ipsum....",
      author: "Zoren Balderama",
      id: 2,
    },
    {
      title: "Web dev top tips",
      body: "lorem ipsum....",
      author: "Dexter Balderama",
      id: 3,
    },
  ]);

  const handleClick = (id: number) => {
    const newBlog = items.filter((item) => item.id !== id);
    setItems(newBlog);
  };

  return (
    <div className="w-4/5 min-h-screen m-auto p-5">
      <h1 className="mb-5">All Blogs</h1>
      <Blog items={items} handleClick={handleClick} />
    </div>
  );
};

export default Blogs;
