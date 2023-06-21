import { AnalyticsData } from './url-analytics.types';

export type UrlData = {
  title?: string;
  clicks: number;
  createdAt: string;
  id: string;
  longUrl: string;
  shortUrl: string;
  QrCode: string | null;
  status: boolean;
  clickData: AnalyticsData[] | [];
};
