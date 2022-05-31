import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import About from './components/About';

import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import Protected from './middlewares/Protected';
import Guest from './middlewares/Guest';
import Socket from './middlewares/Socket';

import useAuthInitializer from './hooks/useAuthInitializer';

function App() {
  useAuthInitializer();
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route
            index
            element={
              <Protected>
                <Socket />
              </Protected>
            }
          />
          <Route
            path="login"
            element={
              <Guest>
                <Login />
              </Guest>
            }
          />
          <Route
            path="register"
            element={
              <Guest>
                <Register />
              </Guest>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
      <About />
    </BrowserRouter>
  );
}

export default App;
