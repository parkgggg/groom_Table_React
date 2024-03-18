import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ReservePage from './pages/ReservePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/:restuarantId">
          <Route index element={<ReservationRoute />}/>
        </Route>
      </Routes>
    </Router>
  );
}

function ReservationRoute() {
  return (
    <Routes>
      <Route path='/' element={<ReservePage/>}/>
      <Route path='/admin' element={<AdminPage />} />
    </Routes>
  )
}

export default App;
