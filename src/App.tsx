
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home';
import CreateNFT from './pages/CreateNFT';
import CategoryPage from './pages/CategoryPage';
import CollectionPage from './pages/CollectionPage';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<CategoryPage />} />
        <Route path="/market/:category" element={<CategoryPage />} />
        <Route path="/collection/:slug" element={<CollectionPage />} />
        <Route path="/create" element={<CreateNFT />} />
        <Route path="/explore" element={<CategoryPage />} /> {/* Redirect or alias */}
        <Route path="/auction" element={<ComingSoon />} />
        <Route path="/club" element={<ComingSoon />} />
        <Route path="/collections" element={<ComingSoon />} />
        <Route path="/pages" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
