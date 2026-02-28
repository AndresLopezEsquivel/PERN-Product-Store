// Components
import Navbar from "./components/Navbar.jsx";
// Pages
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
// Packages
import { Routes, Route } from "react-router-dom";

function App() {
	return(
		<div className="min-h-screen bg-base-200 transition-colors duration-300">
      { /* We'd like to see the navbar on every single page, that's why it is not in Routes */ }
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
		</div>
	);
}
export default App;
