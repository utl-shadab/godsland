import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home';
import CreateNFT from './pages/CreateNFT';
import Explore from './pages/Explore';
import CollectionDetails from './pages/CollectionDetails';
import ComingSoon from './pages/ComingSoon';
import Preloader from './components/Preloader';
import { LoadingProvider } from './context/LoadingContext';

function App() {
  return (
    <LoadingProvider>
      <Router>
        <Preloader />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Explore />} />
          <Route path="/market/:category" element={<Explore />} />
          <Route path="/market/:category/:collectionId" element={<CollectionDetails />} />
          <Route path="/create" element={<CreateNFT />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/collections/:slug" element={<CollectionDetails />} />
          <Route path="/auction" element={<ComingSoon />} />
          <Route path="/club" element={<ComingSoon />} />
          <Route path="/collections" element={<ComingSoon />} />
          <Route path="/pages" element={<ComingSoon />} />
        </Routes>
        <Footer />
      </Router>
    </LoadingProvider>
  );
}

export default App;
