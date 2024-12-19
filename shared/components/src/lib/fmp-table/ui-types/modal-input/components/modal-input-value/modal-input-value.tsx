import { McIcon, McTooltip } from '@maersk-global/mds-react-wrapper';
import { Typography } from '../../../../../typography/typography';
import cx from 'classnames';

import { useTranslation } from '@fes/shared-i18n';
import './modal-input-value.scss';

export type ModalInputValueProps = {
  value: string;
  width: string | number;
  editLabel: string;
  onClick: () => void;
  disabled?: boolean;
};

export const ModalInputValue = ({
  value,
  width,
  onClick,
  editLabel,
  disabled,
}: ModalInputValueProps) => {
  const { t } = useTranslation();
  const classNames = cx('modal-input-value', {
    'modal-input-value--disabled': !!disabled,
  });

  return disabled ? (
    <div className={classNames} style={{ width }} slot="trigger">
      <Typography className="modal-input-value__text" tag="span">
        {value}
      </Typography>
      <McIcon
        className="modal-input-value__icon"
        icon="pencil"
        onClick={onClick}
        title={t(editLabel)}
      />
    </div>
  ) : (
    <McTooltip>
      <div className={classNames} style={{ width }} slot="trigger">
        <Typography className="modal-input-value__text" tag="span">
          {value}
        </Typography>
        <McIcon
          className="modal-input-value__icon"
          icon="pencil"
          onClick={onClick}
          title={t(editLabel)}
        />
      </div>
      <span>{value}</span>
    </McTooltip>
  );
};
