import { nullifyData } from '@fes/shared-api';
import { useTranslation } from '@fes/shared-i18n';
import {
  McButton,
  McCheckbox,
  McModal,
  McTypeahead,
} from '@maersk-global/mds-react-wrapper';
import { useCallback, useState } from 'react';
import { FmpTableCard, FmpTableCardProps } from '../../fmp-table-card/fmp-table-card';
import { Typography } from '../../typography/typography';
import { columns } from './fmp-standby-pinning-table-columns';

import type { StandbyPinning, StandbyPinningListRequest } from '@fes/shared-types';
import type { KeycloakProfile } from 'keycloak-js';

import { setTableGlobalCheckbox } from '../../fmp-table';
import './fmp-stanby-pinning-table.scss';

type ModalInfo = {
  records: StandbyPinning[];
  title: string;
  subtitle: string;
};

export type FmpStandbyPinningTableProps = {
  onDeleteRecordsClick?: (records: StandbyPinning[]) => void;
  profile?: KeycloakProfile;
  appWidth?: number;
} & Pick<
  FmpTableCardProps<StandbyPinning, StandbyPinningListRequest>,
  'endpoint' | 'onRecordChange' | 'onRecordAction' | 'fit' | 'data'
>;

export const FmpStandbyPinningTable = ({
  onDeleteRecordsClick,
  profile,
  appWidth,
  ...rest
}: FmpStandbyPinningTableProps) => {
  const { t } = useTranslation();
  const [modalInfo, setModalInfo] = useState<ModalInfo | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalData, setModalData] = useState<any | null>({});
  const [checkedRecords, setCheckedRecords] = useState<{
    checked: boolean;
    records: StandbyPinning[];
  }>({ records: [], checked: false });
  console.log(checkedRecords);
  const handleDeleteRecordsClick = useCallback(() => {
    const _nullifiedRecords = nullifyData({
      data: [...checkedRecords.records],
      omit: ['quayCraneShortName', 'vesselName', 'createdBy', 'craneMode'],
    });

    const nullifiedRecords = _nullifiedRecords.map((record) => {
      return { ...record, createdBy: profile?.username };
    }) as StandbyPinning[];

    setCheckedRecords((_current) => ({
      ..._current,
      checked: false,
      records: [],
    }));

    setTableGlobalCheckbox('STANDBY_PINNING_ACTION_CHECKBOX', false);

    onDeleteRecordsClick?.(nullifiedRecords);
  }, [checkedRecords, onDeleteRecordsClick, profile?.username]);

  const handleCheckedChange = useCallback(
    ({ records }: { records: StandbyPinning[] }) => {
      setCheckedRecords((_current) => ({
        ..._current,
        records,
        checked: !(records.length === 0),
      }));
    },
    [],
  );

  const handleAssignChecked = useCallback(({ records, title, subtitle }: ModalInfo) => {
    setModalInfo({ records, title, subtitle });
    setCheckedRecords((_current) => ({
      ..._current,
      records,
      checked: !(records.length === 0),
    }));
  }, []);

  const handleModalClosed = useCallback(() => {
    setModalInfo(null);
    setCheckedRecords((_current) => ({
      ..._current,
      checked: false,
      records: [],
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    const updatedData: StandbyPinning[] = [];

    checkedRecords.records.forEach((item) => {
      updatedData.push({
        ...item,
        standbyPosition: modalData.standbyPosition || item.standbyPosition,
        loadPinningPosition: modalData.loadPinningPosition || item.loadPinningPosition,
        dischargePinningPosition:
          modalData.dischargePinningPosition || item.dischargePinningPosition,
      });
    });

    const data = {
      data: updatedData,
    };
    rest.endpoint?.postRequest(data);

    setModalData(null);
    setCheckedRecords((_current) => ({
      ..._current,
      checked: false,
      records: [],
    }));

    setTableGlobalCheckbox('STANDBY_PINNING_ACTION_CHECKBOX', false);
  }, [checkedRecords.records, modalData, rest.endpoint]);

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      const { name, value } = e.target;
      setModalData({
        ...modalData,
        [name]: value, // Dynamically update the corresponding field
      });
    },
    [modalData],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sanitizeKeyData = (data: any, key: string) => {
    const options = data.meta?.options?.[key] || []; // Get the options for the specified key, or an empty array if the key doesn't exist

    return options.map((value: string) => ({
      label: value,
      value: value,
    }));
  };

  return (
    <>
      <div className="fmp-standby-pinning-table">
        <FmpTableCard
          {...rest}
          columns={columns}
          dataKey="quayCraneShortName"
          title={t('Standby & Pinning Stations')}
          icon="crane"
          checkedRecords={checkedRecords.records}
          onGlobalChange={handleCheckedChange}
          UtilityArea={
            checkedRecords.checked && (
              <div className="fmp-standby-pinning-table__utility">
                <McButton
                  icon="pencil"
                  slot="trigger"
                  fit={rest.fit}
                  label={t('Assign Marked')}
                  variant="outlined"
                  appearance="neutral"
                  onClick={() =>
                    handleAssignChecked({
                      records: checkedRecords.records,
                      title: 'Select standby below',
                      subtitle: 'Click on the boxes with bollards to select position',
                    })
                  }
                />

                <McButton
                  icon="trash"
                  fit={rest.fit}
                  label={t('Clear Marked')}
                  onClick={handleDeleteRecordsClick}
                />
              </div>
            )
          }
        />
      </div>
      <McModal
        heading={t(modalInfo?.title || '')}
        dimension="medium"
        open={modalInfo !== null}
        closed={handleModalClosed}
      >
        <div className="fmp-standby-pinning-table__modal">
          <div className="fmp-standby-pinning-table__modal-titles">
            <Typography
              className="fmp-standby-pinning-table__modal-title"
              type="headline"
              size="x-small"
            >
              {modalInfo?.title}
            </Typography>
            <Typography className="fmp-standby-pinning-table__modal-subtitle">
              {modalInfo?.subtitle}
            </Typography>
          </div>
          <div
            className="fmp-standby-pinning-table__modal-body"
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <McTypeahead
              data={sanitizeKeyData(rest.endpoint, 'standbyPosition')}
              name="standbyPosition"
              label="Standby"
              trailingicon="info-circle"
              search={handleChange}
              optionselected={handleChange}
            />
            <McTypeahead
              data={sanitizeKeyData(rest.endpoint, 'loadPinningPosition')}
              name="loadPinningPosition"
              label="Load Pinning"
              trailingicon="info-circle"
              search={handleChange}
              optionselected={handleChange}
            />
            <McTypeahead
              data={sanitizeKeyData(rest.endpoint, 'dischargePinningPosition')}
              name="dischargePinningPosition"
              label="Discharge Pinning"
              trailingicon="info-circle"
              search={handleChange}
              optionselected={handleChange}
            />
          </div>
          <div
            className="fmp-standby-pinning-table__modal-checkboxes"
            style={{
              gridTemplateColumns:
                checkedRecords.records.length > 5
                  ? '1fr '.repeat(5)
                  : '1fr '.repeat(checkedRecords.records.length),
            }}
          >
            {checkedRecords.records.map((record, index) => {
              const idKey = rest.endpoint?.meta?.idKey as keyof StandbyPinning;
              const label = record[idKey] as string;
              return <McCheckbox checked={true} label={label} key={index} />;
            })}
          </div>
        </div>
        <McButton
          focusstartanchor
          slot="primaryAction"
          appearance="primary"
          dialogaction="ok"
          fit={rest.fit}
          click={handleSubmit}
        >
          {t('Mark Selected')}
        </McButton>
        <McButton
          focusendanchor
          slot="secondaryAction"
          appearance="neutral"
          variant="outlined"
          dialogaction="cancel"
          fit={rest.fit}
          click={handleModalClosed}
        >
          {t('Go Back')}
        </McButton>
      </McModal>
    </>
  );
};
