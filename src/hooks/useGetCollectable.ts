import useFetch from 'hooks/useFetch';

type CollectablesResponse = any;

type UseGetCollectablesParameter = {
  contract_address: string;
  token_id: string;
};

const useGetCollectables = ({ contract_address, token_id }: UseGetCollectablesParameter) => {
  const result = useFetch<CollectablesResponse>({
    path: `/asset/${contract_address}/${token_id}`,
  });

  return result;
};

export default useGetCollectables;
