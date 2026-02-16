import { BrowserRouter as Router } from "react-router-dom";
import { LoadingProvider } from "../context/LoadingContext";
import Preloader from "../components/Preloader";

import App from "../App";

const RootProvider = () => {
  return (
    <LoadingProvider>
      <Router>
        <Preloader />
        <App />
      </Router>
    </LoadingProvider>
  );
};

export default RootProvider;
