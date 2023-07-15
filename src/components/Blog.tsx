interface BlogListProps {
  items: BlogItem[];
  title: string;
}
interface BlogItem {
  title: string;
  body: string;
  author: string;
  id: number;
}

const Blog = ({ items, title }: BlogListProps) => {
  return (
    <>
      <h1>{title}</h1>
      {items.map((item) => {
        return (
          <div
            className="shadow-lg p-3 transition duration-500  hover:shadow-gray-500 mb-5 "
            key={item.id}
          >
            <h2>{item.title}</h2>
            <p className="text-cyan-950">Written by: {item.author}</p>
          </div>
        );
      })}
    </>
  );
};

export default Blog;
