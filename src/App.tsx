import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

function App() {
  return (
    <div className='container mx-auto min-h-screen px-5'>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
