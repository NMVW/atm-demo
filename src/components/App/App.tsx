import React, { useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import currency from 'currency.js';

import Notice from '../Notice';
import { State, Txn } from '../../interfaces';
import { computeBalance } from '../../services/redux';
import WithdrawalForm from '../WithdrawalForm';
import TxnList from '../TxnList';

import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Provider } from 'react-redux';
import { store } from '../../services/redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  "palette": {
    "primary": {
      "main": "#36B2AA"
    },
    "secondary": {
      "main": "#945231"
    },
    "error": {
      "main": "#B2363E"
    },
    "success": {
      "main": "#7CB236"
    }
  }
});

function App () {

  const dispatch = useDispatch();

  // watch txns if list changes, recompute balance
  const currentBalance: number = useSelector((state: State) => state.accountBalance.current);

  const txns: Txn[] = useSelector((state: State) => state.txns);
  const setBalance = () => dispatch(computeBalance({ txns }));

  // update current balance on txn changes
  useEffect(() => {
    setBalance();
  }, [txns]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Remaining Balance: $ {currentBalance}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Withdraw Cash
        </Typography>
        <br />
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <Notice message="Get trackin" stickMs={1000} />
      </CardContent>
    </Card>
  );

}

export default function AppContainer() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  );
}