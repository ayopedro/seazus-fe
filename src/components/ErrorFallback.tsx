import { useNavigate } from 'react-router-dom';
import errorImage from '../assets/11104.png';
import { Navbar } from './Navbar';

export const ErrorFallback = () => {
  const navigate = useNavigate();

  const returnReload = () => {
    navigate(-1);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <div className='container mx-auto min-h-screen px-5'>
      <Navbar />
      <div className='flex flex-col items-center justify-center mt-40 gap-2'>
        <h1 className='text-2xl'>Oops! An Error Occured</h1>
        <img src={errorImage} alt='An Error Occured' />
        <button
          onClick={returnReload}
          className='btn btn-primary hover:shadow-xl w-fit mx-auto md:mx-0 text-center mt-5 block'
        >
          Go back
        </button>
      </div>
    </div>
  );
};
