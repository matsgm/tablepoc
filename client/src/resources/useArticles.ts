import useSWR, { mutate } from 'swr';
import { fetcher, post } from '../utils/networking';
import * as React from 'react';

export interface Article {
  id: string;
  title: string;
  published: Date;
  site: string;
  adGroup: string;
  bids: number;
  spending: number;
  winRate: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

const useArticles = () => {
  const { data, error } = useSWR<Article[]>('http://localhost:3000/articles', fetcher);

  return {
    isLoading: !error && !data,
    isError: error,
    articles: data as Article[],
  };
};

export default useArticles;

export const usePostArticle = () => {
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const postArticle = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await post<any, Article[]>('http://localhost:3000/articles', data);
      await mutate('http://localhost:3000/articles', res.data);
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setIsError(true);
      return error;
    }
  };

  return {
    postArticle,
    isLoading,
    isError,
  };
};
