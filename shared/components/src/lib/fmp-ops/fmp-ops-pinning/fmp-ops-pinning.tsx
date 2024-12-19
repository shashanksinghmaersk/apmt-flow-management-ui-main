import React, { useState } from 'react';
import { FmpPage } from '../../fmp-page/fmp-page';
import { useTranslation } from '@fes/shared-i18n';

type MoveType = 'Single' | 'Twins';
type TableRow = {
  moveType: MoveType;
  cycleTime: number;
};

export const FmpOpsPinning: React.FC = () => {
  const { t } = useTranslation();

  const initialData: TableRow[] = [
    { moveType: 'Single', cycleTime: 10 },
    { moveType: 'Twins', cycleTime: 20 },
  ];

  // State to hold table data and edit mode state
  const [tableData, setTableData] = useState<TableRow[]>(initialData);
  const [editMode, setEditMode] = useState<boolean>(false);

  // Function to toggle between edit mode and save mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle data change
  const handleCycleTimeChange = (index: number, newCycleTime: number) => {
    if (newCycleTime > 0 && Number.isInteger(newCycleTime)) {
      const updatedData = [...tableData];
      updatedData[index].cycleTime = newCycleTime;
      setTableData(updatedData);
    }
  };

  // Styles for the table and cells
  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
    width: '50%%',
  };

  const cellStyle: React.CSSProperties = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <>
      <FmpPage
        title={t('Pinning Cycle Time standards')}
        subtitle={t(
          'Standard derived from historical data analysis for the time required by personnel at pinning station to place required number of twist locks on single/twin container which are on their way to QC for loading',
        )}
      >
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Move Type</th>
              <th style={cellStyle}>Cycle Time</th>
              <th style={cellStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td style={cellStyle}>{row.moveType}</td>
                <td style={cellStyle}>
                  {editMode ? (
                    <input
                      type="number"
                      value={row.cycleTime}
                      onChange={(e) =>
                        handleCycleTimeChange(index, Number(e.target.value))
                      }
                    />
                  ) : (
                    row.cycleTime
                  )}
                </td>
                <td style={cellStyle}>
                  {!editMode ? (
                    <button onClick={toggleEditMode}>Edit</button>
                  ) : (
                    <button onClick={toggleEditMode}>Save</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FmpPage>

      <br />
      <FmpPage
        title={t('UnPinning Cycle Time standards')}
        subtitle={t(
          'Standard derived from historical data analysis for the time required by personnel at pinning station to place required number of twist locks on single/twin container which are on their way to QC for loading',
        )}
      >
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Move Type</th>
              <th style={cellStyle}>Cycle Time</th>
              <th style={cellStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td style={cellStyle}>{row.moveType}</td>
                <td style={cellStyle}>
                  {editMode ? (
                    <input
                      type="number"
                      value={row.cycleTime}
                      onChange={(e) =>
                        handleCycleTimeChange(index, Number(e.target.value))
                      }
                    />
                  ) : (
                    row.cycleTime
                  )}
                </td>
                <td style={cellStyle}>
                  {!editMode ? (
                    <button onClick={toggleEditMode}>Edit</button>
                  ) : (
                    <button onClick={toggleEditMode}>Save</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FmpPage>
    </>
  );
};
