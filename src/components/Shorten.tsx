import { useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { CreateShortUrl, ShortUrlResponse, ShortenURL } from '../types';
import { ShortUrl } from './ShortUrl';
import { generateUrl } from '../services/api-calls';

export const Shorten = () => {
  const initValues: ShortenURL = {
    long_url: '',
    domain: '',
    title: '',
  };

  const initUrlValues: ShortUrlResponse = {
    longUrl: '',
    shortUrl: '',
    id: '',
  };

  const [values, setValues] = useState<ShortenURL>(initValues);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [urlData, setUrlData] = useState<ShortUrlResponse>(initUrlValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeResult();

    const data: CreateShortUrl = {
      longUrl: values.long_url,
      customDomain: values.domain,
      title: values.title,
    };

    await generateUrl(data).then((res) => {
      const data: ShortUrlResponse = {
        longUrl: res.longUrl,
        shortUrl: res.shortUrl,
        id: res.id,
      };
      if (typeof res !== 'string') {
        setShowResult(true);
      }
      setUrlData(data);
    });
  };

  const closeResult = () => {
    setShowResult(false);
    setValues(initValues);
  };

  return (
    <div className='py-5'>
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
              placeholder='https://seazus.onrender.com'
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
            short_url={urlData.shortUrl}
            id={urlData.id}
            onClick={closeResult}
          />
        )}
      </form>
    </div>
  );
};
