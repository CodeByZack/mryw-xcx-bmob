import { useEffect, useState } from 'react';

interface IConfig<T extends RequestType = RequestType> {
  initParam?: ParamsType<T>;
  skipFirstQuery?: boolean;
  formatResult?: (res: PromiseType<ReturnType<T>>) => any;
}
interface IResult<T extends RequestType = RequestType> {
  loading: boolean;
  query: Function;
  data: PromiseType<ReturnType<T>> | null;
}

export type RequestType<O = any, I = any> = (params?: I) => Promise<O>;

type ParamsType<T extends (...args: any) => any> = T extends (
  args: infer R,
) => any
  ? R
  : any;

type PromiseType<T extends Promise<any>> = T extends Promise<infer A>
  ? A
  : unknown;
const useSimpleQuery = <T extends RequestType>(
  request: T,
  config: IConfig<T> = {},
): IResult<T> => {
  const { initParam, formatResult, skipFirstQuery } = config;
  const [data, setData] = useState<PromiseType<ReturnType<T>> | null>(null);
  const [loading, setLoading] = useState(true);
  const query = async (param: { [key: string]: any } = {}) => {
    setLoading(true);
    const res = await request(param);
    setLoading(false);
    const result = formatResult ? formatResult(res) : res;
    setData(result);
  };

  useEffect(() => {
    if (skipFirstQuery) {
      setLoading(false);
      return;
    }
    query(initParam);
    // eslint-disable-next-line
  }, []);
  return { data, loading, query };
};

export default useSimpleQuery;
