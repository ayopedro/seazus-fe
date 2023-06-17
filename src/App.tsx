import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  Home,
  Profile,
  Login,
  Signup,
  ForgotPasswordPage,
  ResetPasswordPage,
  ChangePassword,
  LinkDetail,
} from './pages';
import { Navbar } from './components/Navbar';
import { Protected } from './components/Protected';
import 'antd/dist/reset.css';
import { Result } from 'antd';
import { ConfirmEmail } from './pages/ConfirmEmail';

function App() {
  const navigate = useNavigate();
  return (
    <div className='container mx-auto min-h-screen px-5'>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='confirm-email' element={<ConfirmEmail />} />
        <Route path='forgot-password' element={<ForgotPasswordPage />} />
        <Route path='reset-password' element={<ResetPasswordPage />} />
        <Route
          path='profile'
          element={<Protected component={Profile} isLoggedIn={true} />}
        />
        <Route
          path='link/:id'
          element={<Protected component={LinkDetail} isLoggedIn={true} />}
        />
        <Route
          path='change-password'
          element={<Protected component={ChangePassword} isLoggedIn={true} />}
        />
        <Route
          path='*'
          element={
            <div className='mt-20'>
              <Result
                status='404'
                title={
                  <h2 className='text-3xl md:text-5xl text-secondary font-bold'>
                    Page not found!
                  </h2>
                }
                subTitle={
                  <p className='text-white md:text-base'>
                    Sorry, the page you visited does not exist.
                  </p>
                }
                extra={
                  <button
                    className='btn btn-primary'
                    onClick={() => navigate('/')}
                  >
                    Back Home
                  </button>
                }
              />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
