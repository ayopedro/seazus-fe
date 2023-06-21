export type ShortUrlProps = {
  long_url: string;
  short_url: string;
  id: string;
  onClick: () => void;
};

export type ShortUrlResponse = {
  longUrl: string;
  shortUrl: string;
  id: string;
};
