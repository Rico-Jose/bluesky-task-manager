import React from 'react';
import { Table } from '@material-ui/core';

export default function useTable(/* records: any, headCells: any */) {
  const TblContainer = (props: any) => <Table>{props.children}</Table>;
  return {
    TblContainer,
  };
}
