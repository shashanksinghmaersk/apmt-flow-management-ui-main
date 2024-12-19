import './fmp-table-placeholder.scss';

export type FmpTablePlaceHolderProps<T> = {
  data?: T[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FmpTablePlaceHolder = <T extends Record<string, any>>({
  data,
}: FmpTablePlaceHolderProps<T>) => {
  return (
    (!data || (data && data.length < 1)) && (
      <div className="fmp-table-placeholder" slot="state" />
    )
  );
};
