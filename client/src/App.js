import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import About from './components/About';
import Protected from './middlewares/Protected';
import Guest from './middlewares/Guest';
import Socket from './middlewares/Socket';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import useAuthInitializer from './hooks/useAuthInitializer';

function App() {
  useAuthInitializer();
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route index element={<Protected component={Socket} />} />
          <Route path="login" element={<Guest component={Login} />} />
          <Route path="register" element={<Guest component={Register} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
      <About />
    </BrowserRouter>
  );
}

export default App;
