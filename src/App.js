import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ReservePage from './pages/ReservePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/:restaurantId" element={<ReservationRoute />}>
          <Route index element={<ReservePage />}/>
          <Route path='admin' element={<AdminPage />} />
        </Route>
      </Routes>
    </Router> 
  );
}

function ReservationRoute() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App;
