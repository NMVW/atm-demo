import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { INITIAL_ACCOUNT_BALANCE } from '../../constants';
import { store, addTxn } from '../../services/redux';

describe('App', function() {

  describe('Account Balance', function() {

    let balanceUI = null;

    beforeEach(function() {
      const { getByText } = render(<App />);
      balanceUI = getByText(/remaining balance/i);
    });

    test(`exists and with initial balance $ ${INITIAL_ACCOUNT_BALANCE}`, function() {
      expect(balanceUI).toContainHTML(`$ ${INITIAL_ACCOUNT_BALANCE}`);
    });

    test.skip('balance updated by add / remove txn actions', function() {
      store.dispatch(addTxn({ name: 'name', amount: 100 }));
      expect(balanceUI).toContainHTML(`$ ${INITIAL_ACCOUNT_BALANCE - 100}`);
    });

  });

  describe('ATM Withdrawal', function() {

    let withdrawalUI = null;

    beforeEach(function() {
      const { getByText } = render(<App />);
      withdrawalUI = getByText(/withdraw cash/i);
    });

    test('withdrawal form exists', function() {
      expect(withdrawalUI).toBeInTheDocument();
    });
  });

  describe('Recent Transactions', function() {

    let recentTxnsUI = null;

    beforeEach(function() {
      const { getByText } = render(<App />);
      recentTxnsUI = getByText(/recent transactions/i);
    });

    test('list of recent txns exists', function() {
      expect(recentTxnsUI).toBeInTheDocument();
    });

  });

});
