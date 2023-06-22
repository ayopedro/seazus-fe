import { MdBarChart, MdClose, MdOutlineContentCopy } from 'react-icons/md';
import { copyToClipboard } from '../utils/helpers';
import { ShortUrlProps } from '../types';
import { Link } from 'react-router-dom';

export const ShortUrl = ({ short_url, id, onClick }: ShortUrlProps) => {
  return (
    <div className='flex justify-between p-3 border-none rounded-md bg-primary mt-10 w-full'>
      <div className='flex items-center gap-3 justify-between w-full text-white'>
        <a
          href={`https://seazus.onrender.com/${short_url}`}
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
            onClick={() =>
              copyToClipboard(`https://seazus.onrender.com/${short_url}`)
            }
            className='cursor-pointer hover:text-secondary'
          />
          <MdClose
            onClick={onClick}
            className='cursor-pointer hover:text-secondary'
          />
        </div>
      </div>
    </div>
  );
};
