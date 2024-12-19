import { useTranslation } from '@fes/shared-i18n';
import { getAppearanceValues } from '@fes/shared-theme';
import { Typography } from '../../../typography/typography';

import type { ThemeAppearance } from '@fes/shared-types';
import type { FmpTableColumnRenderProps } from '../../types';
import type { StatusBackgroundUiMeta } from './types';

import './status-background.scss';

export function StatusBackground<T>({
  column,
  value,
  newRowIds,
  meta,
  record,
}: FmpTableColumnRenderProps<T>) {
  const { t } = useTranslation();
  const uiMetaProps = (column?.uxMeta || {}) as StatusBackgroundUiMeta;
  const idKey = meta?.idKey as keyof T;
  const idKeyValue = record[idKey] as string | number;

  let appearance: ThemeAppearance = uiMetaProps[value];

  let mainBgColor = 'transparent';
  let mainFgColor = 'inherit';

  if (uiMetaProps['*'] && !appearance) {
    appearance = uiMetaProps['*'];
  }

  if (appearance) {
    const { backgroundColor: _mainBgColor, onBackgroundColor: _mainFgColor } =
      getAppearanceValues(appearance, 'default');
    mainBgColor = `var(${_mainBgColor})`;
    mainFgColor = `var(${_mainFgColor})`;
  }

  const { backgroundColor: _infoBgColor, onBackgroundColor: _infoFgColor } =
    getAppearanceValues('info', 'default');

  const infoBgColor = `var(${_infoBgColor})`;
  const infoFgColor = `var(${_infoFgColor})`;

  const width = 18;
  const isNew = newRowIds?.includes(idKeyValue);

  return (
    <div style={{ width: 36 }}>
      <div
        className="fmp-table-uitype-status-background fmp-table-uitype-status-background--main"
        style={{
          backgroundColor: mainBgColor,
          color: mainFgColor,
          width: width,
        }}
      >
        <Typography size="x-small" weight="bold">
          {mainBgColor !== 'transparent' ? t(value) : ''}
        </Typography>
      </div>
      {isNew && (
        <div
          className="fmp-table-uitype-status-background fmp-table-uitype-status-background--new"
          style={{
            backgroundColor: infoBgColor,
            color: infoFgColor,
            width: width,
            left: mainBgColor === 'transparent' ? 0 : width,
          }}
        >
          <Typography size="x-small" weight="bold">
            {t('NEW')}
          </Typography>
        </div>
      )}
    </div>
  );
}
