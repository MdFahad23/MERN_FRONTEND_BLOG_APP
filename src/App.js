import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/home/Homepage";
import ArticleDetailPage from "./pages/ArticleDetail/ArticleDetailPage";

function App() {
  return (
    <div className="font-opensans">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
