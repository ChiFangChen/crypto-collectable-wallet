import { useState, useEffect } from 'react';
import qs from 'qs';

import { limit, owner } from 'utils/variables';
import useFetch from 'hooks/useFetch';

type CollectablesResponse = any;

type UseGetCollectablesParameter = {
  page: number;
};

const useGetCollectables = ({ page }: UseGetCollectablesParameter) => {
  const [accumulatedCollectables, setAccumulatedCollectables] = useState<
    CollectablesResponse['assets']
  >([]);
  const [isFinished, setIsFinished] = useState(false);

  const query = qs.stringify(
    {
      owner,
      limit,
      offset: limit * (page - 1),
    },
    { addQueryPrefix: true },
  );

  const { data = [], reset: orinReset, ...result } = useFetch<CollectablesResponse>({
    path: `/assets${query}`,
  });

  useEffect(() => {
    if (result.isDone) {
      if (page === 1) {
        setAccumulatedCollectables(data.assets);
      } else {
        setAccumulatedCollectables((r: any) => [...r, ...data.assets]);
      }
      if (data.assets.length < 20) setIsFinished(true);
    }
  }, [result.isDone]);

  const reset = () => {
    orinReset();
    setAccumulatedCollectables([]);
  };

  return {
    data: accumulatedCollectables,
    isFinished,
    reset,
    ...result,
  };
};

export default useGetCollectables;
