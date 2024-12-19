import { McIcon, McTag } from '@maersk-global/mds-react-wrapper';
import cx from 'classnames';
import { FmpCountNotification } from '../../../../fmp-count-notification/fmp-count-notification';
import {
  BackgroundQC,
  BackgroundRTG,
  TruckLeft,
  TruckLeftUnladen,
  TruckRight,
  TruckRightUnladen,
} from '../../../../fmp-icons';
import { Typography } from '../../../../typography/typography';

import type { TaktVisualisationNode } from '@fes/shared-types';

import './circuit-node.scss';

export type CircuitNodeProps = {
  direction?: 'left' | 'right';
  node?: TaktVisualisationNode;
  className?: string;
};

export const CircuitNode = ({ direction, node, className }: CircuitNodeProps) => {
  const classNames = cx(className, 'circuit-node', {
    'circuit-node--qc': node?.cheKind === 'QC',
    'circuit-node--rtg': node?.cheKind === 'RTG',
  });

  const isRtgOrQc = node?.cheKind === 'QC' || node?.cheKind === 'RTG';

  return (
    <div className={classNames}>
      {node?.cheKind && (
        <div className="circuit-node__background">
          {node?.cheKind === 'QC' && <BackgroundQC />}
          {node?.cheKind === 'RTG' && <BackgroundRTG />}
        </div>
      )}
      <div className="circuit-node__title">
        {isRtgOrQc && node?.andon && (
          <McIcon
            icon="exclamation-triangle-solid"
            color="var(--mds_brand_appearance_error_default_background-color)"
          />
        )}
        <Typography
          appearance={node?.cheKind === 'QC' && node?.andon ? 'error' : 'neutral'}
          weak={!isRtgOrQc}
          type="text"
          size="small"
          weight={isRtgOrQc ? 'medium' : 'normal'}
          style={{
            color: `var(--mds_brand_appearance_${node?.cheState}_default_background-color)`,
          }}
        >
          {node?.nodeName}
        </Typography>
        {node?.cheDetails && node.cheDetails.length > 1 && (
          <FmpCountNotification variant="weak" count={node.cheDetails.length} />
        )}
      </div>
      {node?.cheCargoType ? (
        <div className="circuit-node__truck">
          {direction === 'right' &&
            (!isRtgOrQc && node?.cheCargoType === 'LADEN' ? (
              <TruckRight />
            ) : (
              <TruckRightUnladen />
            ))}
          {direction === 'left' &&
            (!isRtgOrQc && node?.cheCargoType === 'LADEN' ? (
              <TruckLeft />
            ) : (
              <TruckLeftUnladen />
            ))}
        </div>
      ) : (
        <div className="circuit-node__truck-blank"></div>
      )}
      <div className="circuit-node__cheid">
        {!isRtgOrQc && node?.andon && (
          <McIcon
            icon="exclamation-triangle-solid"
            color={'var(--mds_brand_appearance_error_default_background-color)'}
          />
        )}
        {node?.cheDetails?.map((cheDetail) => {
          return (
            <>
              {!isRtgOrQc && cheDetail.andon && (
                <McIcon
                  icon="exclamation-triangle-solid"
                  color={`var(--mds_brand_appearance_error_default_background-color)`}
                />
              )}
              <McTag
                fit="small"
                label={cheDetail.cheId}
                appearance={
                  !isRtgOrQc && cheDetail.cheState ? cheDetail.cheState : 'neutral'
                }
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
