import { FmpTableColumn, FmpTableColumnUxType } from '../../types';

export function getUxType<T>(
  uxType: FmpTableColumnUxType = 'String',
): Partial<FmpTableColumn<T>> {
  const defaultColumnProps: Omit<FmpTableColumn<T>, 'id'> = {
    sortDisabled: true,
    label: '',
    align: 'left',
  };

  const map: Record<FmpTableColumnUxType, Partial<FmpTableColumn<T>>> = {
    String: {
      uiType: 'Text',
    },
    Number: {
      uiType: 'Text',
      align: 'right',
    },
    Boolean: {
      uiType: 'Text',
      align: 'center',
    },
    SelectOptions: {
      uiType: 'SelectOptions',
      width: '180px',
    },
    DateTime: {
      uiType: 'DateTime',
      width: '220px',
    },
    EpochTimer: {
      uiType: 'EpochTimer',
      align: 'center',
    },
    StatusBackground: {
      uiType: 'StatusBackground',
      width: '24px',
    },
    Icon: {
      uiType: 'Icon',
    },
    Action: {
      uiType: 'Action',
    },
    Input: {
      uiType: 'Input',
    },
    ModalInput: {
      uiType: 'ModalInput',
    },
    Tag: {
      uiType: 'Tag',
    },
    Text: {
      uiType: 'Text',
    },
    Title: {
      uiType: 'Title',
    },
    Typeahead: {
      uiType: 'Typeahead',
    },
  };

  return { ...defaultColumnProps, ...map[uxType] };
}
