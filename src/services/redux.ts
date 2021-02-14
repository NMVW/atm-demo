import { Txn } from '../interfaces';

import { INITIAL_ACCOUNT_BALANCE } from '../constants';
import { combineReducers } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  accountBalance: {
    original: INITIAL_ACCOUNT_BALANCE,
    current: INITIAL_ACCOUNT_BALANCE,
  },
  txns: [],
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

const txnsSlice = createSlice({
  name: 'txns',
  initialState: INITIAL_STATE.txns,
  reducers: {

    addTxn: {
      reducer(state: Txn[], action: Action): any {
        const txn: Txn = action.payload;
        return state.concat(txn);
      },
      prepare(txn: Txn) {
        // autogenerate txn id prior
        return { payload: { id: TxnID.next(), ...txn } };
      },
    },

    removeTxn(state: Txn[] | [], action: Action): any {
      const id = action.payload;
      return state.filter(txn => txn.id !== id);
    },

  },
});

export const { computeBalance } = accountSlice.actions;
export const { addTxn, removeTxn } = txnsSlice.actions;

export const reducer = combineReducers({
  accountBalance: accountSlice.reducer,
  txns: txnsSlice.reducer,
});

export const store = configureStore({ reducer })

export { TxnID, INITIAL_STATE };
