import type { ExceptionAndon } from '@fes/shared-types';
import { McButton, McOption, McSelect } from '@maersk-global/mds-react-wrapper';

import { Typography } from '../../typography/typography';
import type { FmpTableColumn } from '../../fmp-table/types';

export const fmpExceptionAndonColumns: FmpTableColumn<ExceptionAndon>[] = [
  {
    id: 'andonStatus',
    uxType: 'StatusBackground',
    uxMeta: { Open: 'error' },
  },
  {
    id: 'che',
    label: 'CHE',
  },
  {
    id: 'type',
    label: 'Type',
  },
  {
    id: 'investigation',
    label: 'Investigation',
    uxType: 'SelectOptions',
    width: '200px',
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {record.doneBy && record.hardClosed ? (
            <div className="fmp-exception-andon-table__cell-investigation-byline">
              <Typography size="medium">Closed</Typography>
              <div>
                <Typography size="x-small" tag="span">
                  BY:&nbsp;
                </Typography>
                <Typography size="x-small" tag="span" weight="bold">
                  {record.doneBy?.toUpperCase()}
                </Typography>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'started',
    label: 'Started',
    uxType: 'DateTime',
    uxMeta: {
      title: ['time'],
      subtitle: ['date'],
    },
  },
  {
    id: 'duration',
    label: 'Duration',
    uxType: 'EpochTimer',
  },
  {
    id: 'stcm',
    label: 'ST CM',
    width: '160px',
    uxType: 'ModalInput',
    uxMeta: {
      heading: 'Add ST CM',
      inputLabel: 'Write Comment',
      inputPlaceholder: 'Description of the countermeasure',
    },
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            record.stcm ? (
              <Typography disabled>{record.stcm}</Typography>
            ) : (
              <McButton icon={'comment'} label={'Add'} appearance="neutral" disabled />
            )
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'processArea',
    label: 'Process Area',
    uxType: 'SelectOptions',
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            <McSelect label="" value={record.processArea} optionswidth="auto" disabled>
              <McOption value={record.processArea} key={record.processArea}>
                {record.processArea}
              </McOption>
            </McSelect>
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'processMin',
    label: 'Process Min',
    uxType: 'SelectOptions',
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            <McSelect label="" optionswidth="auto" disabled>
              <McOption value={record.processMin} key={record.processMin}>
                {record.processMin}
              </McOption>
            </McSelect>
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'workInstruction',
    label: 'Work Instruction',
    uxType: 'SelectOptions',
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            <McSelect label="" optionswidth="auto" disabled>
              <McOption value={record.workInstruction} key={record.workInstruction}>
                {record.workInstruction}
              </McOption>
            </McSelect>
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'whatHappened',
    label: 'What Happened',
    uxType: 'SelectOptions',
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            <McSelect label="" optionswidth="auto" disabled>
              <McOption value={record.whatHappened} key={record.whatHappened}>
                {record.whatHappened}
              </McOption>
            </McSelect>
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'firstWhy',
    label: '1st Why',
    uxType: 'SelectOptions',
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            <McSelect label="" optionswidth="auto" disabled>
              <McOption value={record.firstWhy} key={record.firstWhy}>
                {record.firstWhy}
              </McOption>
            </McSelect>
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'secondWhy',
    label: '2nd Why',
    uxType: 'SelectOptions',
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            <McSelect label="" optionswidth="auto" disabled>
              <McOption value={record.secondWhy} key={record.secondWhy}>
                {record.secondWhy}
              </McOption>
            </McSelect>
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'thirdWhy',
    label: '3rd Why',
    uxType: 'SelectOptions',
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            <McSelect label="" optionswidth="auto" disabled>
              <McOption value={record.thirdWhy} key={record.thirdWhy}>
                {record.thirdWhy}
              </McOption>
            </McSelect>
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'fourWhy',
    label: '4th Why',
    width: '160px',
    uxType: 'ModalInput',
    uxMeta: {
      heading: 'Add 4th Why',
      inputLabel: 'Write Comments',
      inputPlaceholder: 'Description',
    },
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            record.fourWhy ? (
              <Typography disabled>{record.fourWhy}</Typography>
            ) : (
              <McButton icon={'comment'} label={'Add'} appearance="neutral" disabled />
            )
          ) : (
            children
          )}
        </div>
      );
    },
  },
  {
    id: 'fiveWhy',
    label: '5th Why',
    width: '160px',
    uxType: 'ModalInput',
    uxMeta: {
      heading: 'Add 5th Why',
      inputLabel: 'Write Comments',
      inputPlaceholder: 'Description',
    },
    outerRender: ({ record, children }) => {
      return (
        <div className="fmp-exception-andon-table__cell-investigation">
          {(record.investigation === 'Closed' && !record.hardClosed) ||
          (record.investigation === 'Not taken' && !record.hardClosed) ? (
            record.fiveWhy ? (
              <Typography disabled>{record.fiveWhy}</Typography>
            ) : (
              <McButton icon={'comment'} label={'Add'} appearance="neutral" disabled />
            )
          ) : (
            children
          )}
        </div>
      );
    },
  },
];
