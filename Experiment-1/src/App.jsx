import "./App.css";
import Header from "./components/Header";
import PostComposer from "./components/PostComposer";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <PostComposer />
      <Footer />
    </div>
  );
}

export default App;