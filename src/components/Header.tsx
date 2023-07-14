const Header = () => {
  return (
    <header
      className="w-full p-3 m-auto shadow-lg shadow-indigo-500/40 flex
     justify-between px-10 items-center"
    >
      <div>
        <h1>{"<dexter />"}</h1>
      </div>
      <div>
        <ul className="flex text-xl text-cyan-700 font-semibold">
          <li>
            <a href="/">Home</a>
          </li>
          <li className="px-5">
            <a href="/new">Create Blog</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
