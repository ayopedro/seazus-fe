export type ShortUrlProps = {
  short_url: string;
  id: string;
  onClick: () => void;
};

export type ShortUrlResponse = {
  longUrl: string;
  shortUrl: string;
  id: string;
};
