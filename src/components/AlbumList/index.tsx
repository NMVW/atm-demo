import { Album } from '../../interfaces';

import React from 'react';
import { DataGrid, ColDef } from '@material-ui/data-grid';

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Source', width: 250 },
  { field: 'amount', headerName: 'Amount', width: 130 },
];

export default function DataTable(props: { isLoading: boolean, albums: Album[] }) {
  return (
    <div>{ props.isLoading ? 'loading' : JSON.stringify(props.albums)}</div>
  );
  // const txns = props.txns.map((txn: Album) => ({ ...txn, amount: currency(txn.amount).format() }));
  //
  // return (
  //   <div className="AlbumTable" style={{ height: 400, width: '100%' }}>
  //     <DataGrid rows={txns.reverse()} columns={columns} pageSize={5} loading={props.isLoading} />
  //   </div>
  // );
}
