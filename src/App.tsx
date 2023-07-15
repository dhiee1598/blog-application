import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="max-w-5xl m-auto">
      <Header />
      <Blogs />
      <Footer />
    </div>
  );
};

export default App;
