import { useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { ShortUrlProps, ShortenURL } from '../types';
import { ShortUrl } from './ShortUrl';

export const Shorten = () => {
  const initValues: ShortenURL = {
    long_url: '',
    domain: '',
    title: '',
  };

  const initUrlValues: ShortUrlProps = {
    long_url: '',
    short_url: '',
    id: '',
    qr_code: '',
  };

  const [values, setValues] = useState<ShortenURL>(initValues);
  const [showResult] = useState<boolean>(false);
  const [urlData] = useState<ShortUrlProps>(initUrlValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className='md:w-5/6'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label htmlFor='long_url'>Paste a long URL</label>
          <input
            type='url'
            placeholder='Enter long URL here'
            value={values.long_url}
            name='long_url'
            onChange={handleChange}
            className='text-center md:text-left'
          />
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-3 mt-3'>
          <div className='flex flex-col mt-3 w-full'>
            <label htmlFor='domain'>Domain (optional)</label>
            <input
              type='text'
              placeholder='seazus/'
              value={values.domain}
              name='domain'
              onChange={handleChange}
              className='text-center md:text-left'
            />
          </div>
          <div className='flex flex-col mt-3 w-full'>
            <label htmlFor='title'>Title (optional)</label>
            <input
              type='text'
              placeholder='Enter an optional title'
              value={values.title}
              name='title'
              onChange={handleChange}
              className='text-center md:text-left'
            />
          </div>
        </div>
        <button
          className='btn btn-primary mt-10 flex items-center justify-center'
          disabled={!values.long_url}
        >
          <AiOutlineLink className='mr-2' />
          Shorten URL
        </button>
        {showResult && (
          <ShortUrl
            long_url={urlData.long_url}
            short_url={urlData.short_url}
            id={urlData.id}
            qr_code={urlData.qr_code}
          />
        )}
      </form>
    </div>
  );
};
