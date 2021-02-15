import { State, Txn } from '../interfaces';

import { INITIAL_ACCOUNT_BALANCE } from '../constants';
import { combineReducers } from 'redux';
import { configureStore, createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchRecentTxns } from './api';

const INITIAL_STATE: State = {
  accountBalance: {
    original: INITIAL_ACCOUNT_BALANCE,
    current: INITIAL_ACCOUNT_BALANCE,
  },
  txns: {
    status: '',
    list: [],
  },
};

interface Action {
  payload: any
  type: string
}

const accountSlice = createSlice({
  name: 'accountBalance',
  initialState: INITIAL_STATE.accountBalance,
  reducers: {

    /**
     * TODO: extract balance compute functionality to backend to handle large volume of txns (test for > 1k txns in api response)
     * @param state original balance, current running balance
     * @param action 
     */
    computeBalance(state: { original: number, current: number }, action) {
      const { txns }: { txns: Txn[] } = action.payload;
      if (txns.length > 0) {

        // recalculate curr balance from all txns against original balance
        state.current = state.original;

        return txns.reduce((accountBalance, txn) => {

          // NOTE: txns are assumed all negative against balance
          accountBalance.current -= txn.amount;
          accountBalance.current = +accountBalance.current.toFixed(2);

          return accountBalance;
        }, state);

      }
      // with empty txns, balances should be reset
      return INITIAL_STATE.accountBalance;
    },

  },
});

class TxnID {
  /**
   * Disclaimer: 
   * clearly not a production uid, purely for client-side demo
   * backend should generate uids
   */
  private static nextTxnId = 0

  public static next() {
    return this.nextTxnId++;
  }

  public static reset() {
    this.nextTxnId = 0;
  }
}

// creates sub action types /<fulfilled|pending|rejected>
const fetchTxns = createAsyncThunk(
  'txns/fetch',
  async () => {
    const response = await fetchRecentTxns();
    return response;
  },
);

const txnsSlice = createSlice({
  name: 'txns',
  initialState: INITIAL_STATE.txns,
  reducers: {

    addTxn: {
      reducer(state: {status: string, list: Txn[] | []}, action: Action): any {
        const txn: Txn = action.payload;
        return { status: state.status, list: state.list.concat(txn as any) };
      },
      prepare(txn: Txn) {
        // autogenerate txn id prior
        return { payload: { id: TxnID.next(), ...txn } };
      },
    },

    removeTxn(state: {status: string, list: Txn[] | []}, action: Action): any {
      // prereq for "undo" feature
      const id = action.payload;
      return { status: state.status, list: state.list.filter(txn => txn.id !== id) };
    },

  },

  // handle async request states
  extraReducers: (builder: ActionReducerMapBuilder<{status: string, list: Txn[]}>) => {

    builder.addCase(fetchTxns.pending, (state: { status: string, list: Txn[] }, action: any) => {
      state.status = 'pending';
      return state;
    });

    builder.addCase(fetchTxns.fulfilled, (state: { status: string, list: Txn[] }, action: any) => {
      state.status = action.payload.status; // can be error
      return state;
    });

    builder.addCase(fetchTxns.rejected, (state: { status: string, list: Txn[] }, action: any) => {
      state.status = 'error';
      return state;
    });

  },

});

export const { computeBalance } = accountSlice.actions;
export const { addTxn, removeTxn } = txnsSlice.actions;
export { fetchTxns };

export const reducer = combineReducers({
  accountBalance: accountSlice.reducer,
  txns: txnsSlice.reducer,
});

export const store = configureStore({ reducer })

export { TxnID, INITIAL_STATE };
