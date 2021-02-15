import { addTxn } from '../../services/redux';
import { Txn, State } from '../../interfaces';

import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import currency from 'currency.js';

import AmountSlider from './AmountSlider';

export default function WithdrawalForm(props: { isLoading: boolean }) {

  const dispatch = useDispatch();

  const currentBalance = useSelector((state: State) => state.accountBalance.current);

  const [ amount, setAmount ] = useState(0.00);
  const [ invalidMsg, setInvalidMsg ] = useState('');

  const withdrawAmount = (ev: any) => {
    dispatch(addTxn({ name: 'ATM Cash Withdrawal', amount }));
    // reset form on submission
    setAmount(0.00);
  };

  // check validation
  useEffect(() => {
    if (amount > 0) {
      const newBalance = currentBalance - amount;
      setInvalidMsg(newBalance < 0 ? `Overdraft of ${currency(newBalance).format()}`: '');
    } else {
      setInvalidMsg('0');
    }
  }, [amount, currentBalance]);

  return (
    <Card className="WithdrawalForm" style={{ display: 'flex' }}>
      <div style={{ marginLeft: '1rem' }}>
        <AmountSlider amount={amount} setAmount={setAmount} />
      </div>
      <div style={{ marginLeft: '1rem', marginTop: '1rem', paddingRight: '1rem' }}>
        <Button className="SubmitBtn" variant="contained" color="primary" onClick={withdrawAmount} disabled={Boolean(invalidMsg) || props.isLoading}>Withdraw</Button>
        <br />
        <Typography className="OverdraftMsg" style={{ textAlign: 'center' }} hidden={!invalidMsg || invalidMsg === '0'} variant="caption" color="error">{ invalidMsg }</Typography>
      </div>
    </Card>
  );
}
