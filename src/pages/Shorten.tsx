import { AiOutlineLink } from 'react-icons/ai';

export const Shorten = () => {
  return (
    <div className='md:w-5/6'>
      <form className='flex flex-col'>
        <div className='flex flex-col'>
          <label htmlFor='long_url'>Paste a long URL</label>
          <input type='url' placeholder='Enter long URL here' />
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-3'>
          <div className='flex flex-col mt-3 w-full'>
            <label htmlFor='domain'>Domain</label>
            <input type='text' readOnly />
          </div>
          <div className='flex flex-col mt-3 w-full'>
            <label htmlFor='title'>Title (optional)</label>
            <input type='text' placeholder='Enter an optional title' />
          </div>
        </div>
        <button className='btn btn-primary mt-5 flex items-center justify-center'>
          <AiOutlineLink className='mr-2' />
          Shorten URL
        </button>
      </form>
    </div>
  );
};
