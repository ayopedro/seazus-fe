import { MdBarChart, MdClose, MdOutlineContentCopy } from 'react-icons/md';
import { copyToClipboard } from '../utils/helpers';
import { ShortUrlProps } from '../types';
import { Link } from 'react-router-dom';

export const ShortUrl = ({
  long_url,
  short_url,
  id,
  onClick,
}: ShortUrlProps) => {
  return (
    <div className='flex justify-between p-3 border-none rounded-md bg-primary mt-10'>
      <p className='hidden md:block'>{long_url}</p>
      <div className='flex items-center gap-3 justify-between w-full s'>
        <a
          href={`http://localhost:3000/${short_url}`}
          target='_blank'
          rel='noreferrer'
        >
          seazus.onrender.com/{short_url}
        </a>
        <div className='flex items-center gap-5'>
          <Link to={`url/${id}`}>
            <MdBarChart className='cursor-pointer' />
          </Link>
          <MdOutlineContentCopy
            onClick={() => copyToClipboard(`seazus.onrender.com/${short_url}`)}
            className='cursor-pointer'
          />
          <MdClose onClick={onClick} />
        </div>
      </div>
    </div>
  );
};
