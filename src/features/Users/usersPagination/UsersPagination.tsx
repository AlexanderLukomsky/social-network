import { FC, ChangeEvent } from 'react';

import { Pagination } from '@mui/material';
import './usersPagination.scss';

export const UsersPagination: FC<UsersPaginationPropsType> = ({
  totalUsersCount,
  pageSize,
  page,
  onChange,
}) => {
  const totalPagesCount = Math.ceil(totalUsersCount / pageSize);

  const onChangeHandler = (event: ChangeEvent<unknown>, currentPage: number) => {
    onChange(currentPage);
  };

  return (
    <div className="users-pagination">
      <Pagination
        onChange={onChangeHandler}
        page={page}
        count={totalPagesCount}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};
type UsersPaginationPropsType = {
  totalUsersCount: number;
  pageSize: number;
  page: number;
  onChange: (page: number) => void;
};
