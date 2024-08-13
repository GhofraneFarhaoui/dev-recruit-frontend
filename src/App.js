// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import EditDeveloperDetails from './pages/developer/EditDeveloperDetails';
import DeveloperOrders from './pages/developer/DeveloperOrders';
import EditHirerDetails from './pages/hirer/EditHirerDetails';
import PlaceOrders from './pages/hirer/PlaceOrders';
import ViewDeveloperDetails from './pages/hirer/ViewDeveloperDetails';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/developer/edit-details"
            element={<EditDeveloperDetails />}
          />
          <Route path="/developer/orders" element={<DeveloperOrders />} />
          <Route path="/hirer/edit-details" element={<EditHirerDetails />} />
          <Route path="/hirer/place-orders" element={<PlaceOrders />} />
          <Route
            path="/hirer/view-developer/:id"
            element={<ViewDeveloperDetails />}
          />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
