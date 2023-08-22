import { FC, useMemo } from 'react';
import './index.scss';

const ProgressBar: FC<any> = ({ data }) => {
  const { withPercentage } = data;

  console.log('data progress', data);

  // const done = data?.status
  //   ? data?.status === 'completed'
  //     ? data?.trigger?.points
  //     : data?.progress ?? data?.progress_after
  //   : withPercentage
  //   ? 0
  //   : '0';
  const { done, total, width } = useMemo(() => {
    let done: any = '';
    let total: any = '';
    let width: any = '';

    if (data?.status) {
      total = data?.trigger?.points;
      if (data?.status === 'completed') {
        done = data?.trigger?.points;
        width = '100%';
      } else {
        done = data?.progress ?? data?.progress_after;
        width = `${((data?.progress ?? data?.progress_after) / (data?.goal ?? data?.trigger?.points)) * 100}%`;
      }
    } else {
      if (withPercentage) {
        done = 0;
      }
      done = '0';
      total = data?.goal ?? data?.balance;
      width = '0';
    }
    return { done, total, width };
  }, [data]);

  console.log(2223, done, total, width, data);

  return (
    <div className="game-box-progress-bar">
      <div
        className="game-box-progress-bar__active"
        style={{
          width,
        }}
      >
        {withPercentage ? (
          <span className="game-box-progress-bar__value--centered">
            {(done * 100) % total === 0 ? (done * 100) / total : ((done * 100) / total).toFixed(1)} {'%'}
          </span>
        ) : (
          <span>{`${done}/${total}`}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
