interface BlogListProps {
  items: BlogItem[];
  handleClick(id: number): void;
}
interface BlogItem {
  title: string;
  body: string;
  author: string;
  id: number;
}

const Blog = ({ items, handleClick }: BlogListProps) => {
  return (
    <>
      {items.map((item) => {
        return (
          <div className="shadow-lg p-3 transition duration-500  hover:shadow-gray-500 mb-5 ">
            <h2>{item.title}</h2>
            <p className="text-cyan-950">Written by: {item.author}</p>
            <button
              className="border px-5 rounded-md bg-slate-600 text-white py-1 transition duration-500
             hover:bg-red-500"
              onClick={() => handleClick(item.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Blog;
