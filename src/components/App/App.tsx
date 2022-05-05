import React, { useEffect, useState, MouseEvent, ReactHTMLElement } from 'react';
import logo from './logo.png';
import './App.css';
import currency from 'currency.js';

import Search from '../Search';
import Notice from '../Notice';
import { State, Txn } from '../../interfaces';
import { computeBalance, fetchTxns, addTxn } from '../../services/redux';
import WithdrawalForm from '../WithdrawalForm';
import TxnList from '../TxnList';
import AppMenu from '../Menu';

import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import OfflineIcon from '@material-ui/icons/OfflineBolt';

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
  const txnsLoadingStatus: string = useSelector((state: State) => state.txns.status);
  const txns: Txn[] = useSelector((state: State) => state.txns.list);

  const setBalance = () => dispatch(computeBalance({ txns }));

  const [ searchInput, setSearchInput ] = useState('');

  const [ toast, setToast ] = useState('');
  const [ menuAnchor, setMenuAnchor ] = useState<ReactHTMLElement<HTMLAnchorElement> | null>(null);

  // update current balance on txn changes
  useEffect(() => {
    setBalance();
  }, [txns]);

  // fetch txns on initial load
  useEffect(() => {

    async function fetchTransactions() {
      // fetch and add txns to store
      const response = await dispatch(fetchTxns()) as any;
      response.payload.txns.forEach((txn: Txn) => dispatch(addTxn(txn)));
    }

    fetchTransactions();

  }, []);

  // toast watcher
  useEffect(() => {
    switch (txnsLoadingStatus) {
      case 'pending':
        setToast('Loading account activity...');
        break;
      case 'online':
        setToast('Account loaded.');
        break;
      case 'error':
        setToast('Account data unavailable.');
        break;
    }
  }, [txnsLoadingStatus]);

  const isLoading = txnsLoadingStatus === 'pending';

  return (
    <Card style={{ padding: '2rem' }}>
      <CardContent>
        <header style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
          <Typography className="AccountBalance" variant="h2" gutterBottom>Filmhub Music</Typography>
          <Avatar
            className={isLoading ? 'App-logo-load': 'App-logo'}
            src={logo}
            style={{ marginBottom: '1rem' }}
            onMouseOver={(ev: MouseEvent) => setMenuAnchor(ev.currentTarget as any)}
          />
          { menuAnchor && <AppMenu anchor={menuAnchor} close={() => setMenuAnchor(null)} /> }
          <Typography variant="overline" hidden={txnsLoadingStatus !== 'error'}><OfflineIcon />Offline</Typography>
          <Search input={searchInput} update={setSearchInput} isLoading={isLoading} />
        </header>
        <Typography variant="h6" gutterBottom>
          Withdraw Cash
        </Typography>
        <WithdrawalForm setToast={setToast} isLoading={isLoading} />
        <br />
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <TxnList txns={txns} isLoading={isLoading} />
        { toast && <Notice message={toast} stickMs={1000} reset={() => setToast('')} /> }
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
