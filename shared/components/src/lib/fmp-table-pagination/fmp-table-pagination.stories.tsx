import type { Meta, StoryObj } from '@storybook/react';

import { FmpTablePagination, FmpTablePaginationProps } from './fmp-table-pagination';

const meta: Meta<FmpTablePaginationProps> = {
  component: FmpTablePagination,
  title: 'Shared/fmp-table-pagination',
};

export default meta;
type Story = StoryObj<typeof FmpTablePagination>;

export const Controllable: Story = {
  args: {
    pagination: {
      hasNextPage: true,
      hasPreviousPage: false,
      itemsPerPage: 10,
      page: 1,
      totalItems: 100,
      totalPages: 10,
    },
  },
};
