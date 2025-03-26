import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from './components/ProductsList';
import SuccessPage from "./components/SuccessPage";
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </main>
      </div>
    </Router>
  );
};

export default App;
