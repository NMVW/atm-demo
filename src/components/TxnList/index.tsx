import { Txn } from '../../interfaces';
import currency from 'currency.js';

import React from 'react';
import { DataGrid, ColDef } from '@material-ui/data-grid';

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Source', width: 250 },
  { field: 'amount', headerName: 'Amount', width: 130 },
];

export default function DataTable(props: { txns: Txn[] }) {
  const txns = props.txns.map((txn: Txn) => ({ ...txn, amount: currency(txn.amount).format() }));
  return (
    <div className="TxnTable" style={{ height: 400, width: '100%' }}>
      <DataGrid rows={txns} columns={columns} pageSize={5} />
    </div>
  );
}
