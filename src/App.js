
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import HomePage from './pages/home-page/home_page';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<HomePage/>}
          />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
