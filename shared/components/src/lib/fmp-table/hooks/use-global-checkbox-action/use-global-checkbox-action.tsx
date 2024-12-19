/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';

type FmpTableStoreGlobalCheckColumnRef = {
  id: string;
  ref: any;
  record: any;
  onAction?: (id: string, record: any, checked: boolean) => void;
};

type FmpTableStoreGlobalCheckColumn = {
  columnRefs: FmpTableStoreGlobalCheckColumnRef[];
  headerRef: any | null;
  records: any[];
  id: string;
};

type UseGlobalCheckboxActionOnChangeProps = {
  records: any[];
  id: string;
  globalChecked: boolean;
};

type UseGlobalCheckboxActionOnChangeFn = (
  props: UseGlobalCheckboxActionOnChangeProps,
) => void;

type LastNotifiedStateProps = {
  records: any[];
  globalChecked: boolean;
};

type LastNotifiedState = Record<string, LastNotifiedStateProps>;

const checkboxAction: Record<string, FmpTableStoreGlobalCheckColumn> = {};

type Listeners = UseGlobalCheckboxActionOnChangeFn[];

const listeners: Listeners = [];

const lastNotifiedState: LastNotifiedState = {};

const notifyListeners = (props: UseGlobalCheckboxActionOnChangeProps) => {
  const { id, records, globalChecked } = props;
  const lastState = lastNotifiedState[id];

  // Check if the new state is different from the last known state
  if (
    !lastState ||
    JSON.stringify(records) !== JSON.stringify(lastState.records) ||
    globalChecked !== lastState.globalChecked
  ) {
    listeners.forEach((listener) => listener(props));
    lastNotifiedState[id] = { records, globalChecked };
  }
};

const actionItemExists = (parentId: string, id: string) => {
  let exists = false;

  observableCheckboxAction[parentId].columnRefs.some((item) => {
    if (item.id === id) {
      exists = true;
    }

    return exists;
  });

  return exists;
};

const recordItemExists = (id: string, idKey: string, idKeyValue: string) => {
  let exists = false;

  observableCheckboxAction[id].records.some((item) => {
    if (item[idKey] === idKeyValue) {
      exists = true;
    }

    return exists;
  });

  return exists;
};

function getRecords<T>(column: FmpTableStoreGlobalCheckColumn) {
  const records: T[] = [];

  column.columnRefs.forEach((ref) => {
    records.push(ref.record);
  });

  return records;
}

const observableCheckboxAction = new Proxy(checkboxAction, {
  set(target, property, value) {
    target[property as string] = value;

    if (property in target) {
      const checkboxItem = target[property as string];
      const globalChecked =
        checkboxItem.records.length === checkboxItem.columnRefs.length &&
        checkboxItem.records.length !== 0 &&
        checkboxItem.columnRefs.length !== 0;

      notifyListeners({
        id: property as string,
        records: checkboxItem.records,
        globalChecked,
      });
    }
    return true;
  },
});

export const setTableGlobalCheckbox = (id: string, checked: boolean) => {
  const controller = observableCheckboxAction[id];

  if (checked) {
    const records = getRecords(controller);
    controller.records = records;
  } else {
    controller.records = [];
  }
};

export type UseGlobalCheckboxActionProps = {
  onChange?: UseGlobalCheckboxActionOnChangeFn;
};

export function useGlobalCheckboxAction<T>({ onChange }: UseGlobalCheckboxActionProps) {
  if (onChange) {
    listeners.push(onChange);
  }

  const addCheckboxAction = useCallback(
    ({ id, headerRef = null, records = [] }: Partial<FmpTableStoreGlobalCheckColumn>) => {
      if (id && !observableCheckboxAction[id]) {
        observableCheckboxAction[id] = {
          id,
          headerRef,
          records,
          columnRefs: [],
        };
      }
    },
    [],
  );

  const addCheckboxActionItem = useCallback(
    (
      parentId: string,
      { id, ref, record, onAction }: FmpTableStoreGlobalCheckColumnRef,
    ) => {
      const itemExists = actionItemExists(parentId, id);

      if (observableCheckboxAction[parentId] && !itemExists) {
        const newColumnRefs = [
          ...observableCheckboxAction[parentId].columnRefs,
          { id, ref, record, onAction },
        ];

        observableCheckboxAction[parentId] = {
          ...observableCheckboxAction[parentId],
          columnRefs: newColumnRefs,
        };
      }
    },
    [],
  );

  const checkboxGlobalChange = useCallback(
    (
      id: string,
      checked: boolean,
      onGlobalChange?: UseGlobalCheckboxActionOnChangeFn,
    ) => {
      const checkboxItem = observableCheckboxAction[id];
      checkboxItem.records = [];

      checkboxItem.columnRefs.forEach((item) => {
        item.ref.checked = checked;

        if (checked) {
          checkboxItem.records.push(item.record);
        }
      });

      const globalChecked = checked;
      notifyListeners({ id, records: checkboxItem.records, globalChecked });
      onGlobalChange?.({ id, records: checkboxItem.records, globalChecked });
    },
    [],
  );

  const checkboxGlobalItemChange = useCallback(
    (
      id: string,
      checked: boolean,
      record: T,
      idKey: string,
      idKeyValue: string,
      onGlobalChange?: (props: {
        records: any[];
        id: string;
        globalChecked: boolean;
      }) => void,
    ) => {
      const checkboxItem = observableCheckboxAction[id];

      if (checked) {
        const recordExists = recordItemExists(id, idKey, idKeyValue);

        if (!recordExists) {
          checkboxItem.records.push(record);
        }

        if (checkboxItem.records.length === checkboxItem.columnRefs.length) {
          checkboxItem.headerRef.checked = true;
        }
      } else {
        checkboxItem.headerRef.checked = false;

        checkboxItem.records = checkboxItem.records.filter(
          (item) => item[idKey] !== idKeyValue,
        );
      }

      const globalChecked =
        checkboxItem.records.length === checkboxItem.columnRefs.length;
      notifyListeners({ id, records: checkboxItem.records, globalChecked });
      onGlobalChange?.({ id, records: checkboxItem.records, globalChecked });
    },
    [],
  );

  return {
    addCheckboxAction,
    addCheckboxActionItem,
    checkboxGlobalChange,
    checkboxGlobalItemChange,
  };
}
