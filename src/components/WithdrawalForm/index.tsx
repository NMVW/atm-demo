import { addTxn } from '../../services/redux';
import { State } from '../../interfaces';

import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import currency from 'currency.js';

import AmountSlider from './AmountSlider';
import BalanceBar from '../BalanceChart';
import UndoTxnBtn from './UndoTxnBtn';

export default function WithdrawalForm(props: { setToast: (toast: string) => void, isLoading: boolean }) {

  const dispatch = useDispatch();

  const currentBalance = useSelector((state: State) => state.accountBalance.current);

  const [ amount, setAmount ] = useState(0.00);
  const [ invalidMsg, setInvalidMsg ] = useState('');
  const [ isUndoOpen, openUndo ] = useState(false);

  const withdrawAmount = (ev: any) => {
    dispatch(addTxn({ name: 'ATM Cash Withdrawal', amount }));
    openUndo(true);
    props.setToast(`Withdrawing ${currency(amount).format()} ...`);
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
    <Card className="WithdrawalForm" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginLeft: '1rem' }}>
        <AmountSlider amount={amount} setAmount={setAmount} />
      </div>
      <div style={{ paddingRight: '.25rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Typography className="OverdraftMsg" style={{ marginRight: '1rem' }} hidden={!invalidMsg || invalidMsg === '0'} variant="caption" color="error">{ invalidMsg }</Typography>
        <br />
        { isUndoOpen ? <UndoTxnBtn close={() => openUndo(false)} timeWindow={3000} setToast={props.setToast} /> : <Button className="SubmitBtn" variant="contained" color="primary" onClick={withdrawAmount} disabled={Boolean(invalidMsg) || props.isLoading}>Withdraw</Button> }
      </div>
      <BalanceBar nextAmount={amount} />
    </Card>
  );
}
