import { useTimer } from '@fes/shared-hooks';
import { McIcon, McTag } from '@maersk-global/mds-react-wrapper';
import { useEffect } from 'react';
import { FmpProgressbar } from '../fmp-progressbar/fmp-progressbar';
import { Typography } from '../typography/typography';

import type { ThemeAppearance, ThemeFit } from '@fes/shared-types';

import './fmp-andon-issue.scss';

export type FmpAndonIssueProps = {
  type: ThemeAppearance;
  icon: string;
  timestamp: number;
  fit?: ThemeFit;
  label: string;
  progressbar?: boolean;
  andon: boolean;
};

export const FmpAndonIssue = ({
  type,
  icon,
  label,
  timestamp,
  progressbar,
  fit,
  andon,
}: FmpAndonIssueProps) => {
  const { meta, timerStart } = useTimer({
    tickInterval: 1000,
    maxTickLimit: 86400001,
    startAt: timestamp,
    duration: 900000,
  });

  useEffect(() => {
    timerStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestamp]);

  return (
    <div className="fmp-andon-issue">
      <McTag fit={fit} className="fmp-andon-issue__tag" appearance={type} icon={icon}>
        {label}
      </McTag>
      <div className="fmp-andon-issue__body">
        <Typography
          className="fmp-andon-issue__message"
          type="text"
          size="small"
          weight="bold"
          weak
        >
          {andon && (
            <McIcon
              className="fmp-andon-issue__message-icon"
              icon="exclamation-triangle-solid"
            />
          )}
          {timestamp && <span>+{meta.numericElapsed}s</span>}
        </Typography>
        {progressbar && (
          <FmpProgressbar
            className="fmp-andon-issue__progressbar"
            type={type}
            percentage={meta.percentage}
            height={4}
            gap={2}
          />
        )}
      </div>
    </div>
  );
};
