export function createFmpTableCustomstyles() {
  const customstyles = `
    .mds-table table tbody tr td {
      background-color: transparent;
    }

    .mds-table table tbody tr {
      background-color: var(--mds_foundations_table_cell_background-color);
      transition: transform 0.5s ease-in-out
    }  
    `;

  return customstyles;
}
