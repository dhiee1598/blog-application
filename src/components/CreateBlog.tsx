import { useState } from "react";
import { ChangeEvent } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const blog = {
      title,
      body,
      author,
    };

    console.log(blog);
  };

  return (
    <div className="w-4/5 min-h-screen m-auto p-5">
      <h1 className="text-center text-6xl mb-10">Create New Blog</h1>
      <form className="flex flex-col w-7/12 m-auto" onSubmit={handleSubmit}>
        <div className="row">
          <label>Blog title:</label>
          <input
            type="text"
            required
            autoFocus
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            value={title}
          />
        </div>
        <div className="row">
          <label>Blog body:</label>
          <textarea
            required
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setBody(e.target.value)
            }
            value={body}
          ></textarea>
        </div>
        <div className="row">
          <label>Blog author:</label>
          <input
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAuthor(e.target.value)
            }
          />
        </div>
        <button className="border p-1 text-lg rounded-md transition duration-500 text-white bg-blue-800 border-black hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
