import BlogDetails from "./components/BlogDetails";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="max-w-5xl m-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
