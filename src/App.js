import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Countdown from './pages/Countdown';
import Enroll from './pages/Enroll';
import SignIn from './pages/SignIn';
import Create from './pages/Create';
import { Edit } from './components/Edit';
import Other from './pages/Other';

import { EventInfoProvider } from './contexts/EventInfoContext';
import { UserProvider } from './contexts/UserContext';
import { HotelContext } from './contexts/HotelContext';

import useToken from './hooks/useToken';
import { useState } from 'react';

export default function App() {
  return (
    <>
      <ToastContainer />
      <EventInfoProvider>
        <UserProvider>
          <HotelContext.Provider>
            <Router>
              <Routes>
                <Route path="/" element={<Countdown />} />
                <Route path="/enroll" element={<Enroll />} />
                <Route path="/sign-in" element={<SignIn />} />

                <Route path="/criar" element={<Create />}></Route>
                <Route path="/ordens" element={<Edit />}></Route>
                <Route path="/cadastros" element={<Other />}></Route>
              </Routes>
            </Router>
          </HotelContext.Provider>
        </UserProvider>
      </EventInfoProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
