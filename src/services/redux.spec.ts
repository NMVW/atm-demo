import {
  computeBalance, addTxn, removeTxn, TxnID,
  INITIAL_STATE, reducer
} from './redux';

describe('Redux', function() {

  describe('TxnID', function() {

    beforeAll(function() {
      TxnID.reset(); // fresh counter
    });

    const ids = [0, 1, 2];
    ids.forEach(function(id: number) {
      test(`id should autoincrement ${id}`, function() {
        expect(TxnID.next()).toEqual(id);
      });
    });

  });

  describe('Actions', function() {

    const txnData = { name: 'name', amount: 100.10 };

    beforeAll(function() {
      TxnID.reset();
    });

    describe('addTxn should containt increasing client-side txn ids', function() {

      const ids = [0, 1, 2];

      ids.forEach(function(id: number) {
        test(`id ${id}`, function() {
          expect(addTxn(txnData)).toEqual({ type: 'txns/addTxn', payload: { id, ...txnData } });
        });
      });

    });

    test('addTxn should create new txn instances with same txn input data', function() {

      const txn = addTxn(txnData);
      expect(txn).toHaveProperty('payload.name', 'name');
      expect(txn).toHaveProperty('payload.amount', 100.10);

      const freshTxn = addTxn(txnData);
      expect(freshTxn).toHaveProperty('payload.name', 'name');
      expect(freshTxn).toHaveProperty('payload.amount', 100.10);

      expect(txn.payload.id === freshTxn.payload.id).toEqual(false);

    });

    test.skip('computeBalance should sum all txns in list', function() {
      const txnAction = addTxn(txnData);
      const txns = reducer(INITIAL_STATE, txnAction);
      const balance = computeBalance(txns);
      expect(balance).toEqual(200.20);
    });

  });

  describe('Reducers', function() {

    const txnData = { name: 'name', amount: 100.10 };

    beforeAll(function() {
      TxnID.reset();
    });

    test('should return the initial state', function() {
      const nextState = reducer(INITIAL_STATE, {});
      expect(nextState).toEqual(INITIAL_STATE);
    });

    describe('txns slice', function() {

      test('adding txns should grow txn list', function() {

        const nextState = reducer(INITIAL_STATE, addTxn(txnData));
        const finalState = reducer(nextState, addTxn(txnData));

        expect(finalState).toEqual({ ...INITIAL_STATE, txns: [{ id: 0, ...txnData}, { id: 1, ...txnData }] });
      });

      test('removing txns should shrink txn list', function() {

        const nextState = reducer(INITIAL_STATE, addTxn(txnData));
        const finalState = reducer(nextState, removeTxn(2));

        expect(finalState.txns.length).toEqual(0);

      });
    });

    describe('accountBalance slice', function() {

      test('adding txns should not change balance', function() {
        const nextState = reducer(INITIAL_STATE, addTxn(txnData));
        expect(nextState.txns).toEqual(expect.not.objectContaining(INITIAL_STATE.txns));
        expect(nextState.accountBalance.current).toEqual(INITIAL_STATE.accountBalance.current);
      });

      test('compute balance should derive sum of transaction amounts', function() {

        let runningBalance = +INITIAL_STATE.accountBalance.original.toFixed(2);

        const initialBalanceState = reducer(INITIAL_STATE, computeBalance({ txns: INITIAL_STATE.txns }));
        expect(initialBalanceState.accountBalance.current).toEqual(runningBalance);

        // add txn
        const nextState = reducer(initialBalanceState, addTxn(txnData));
        runningBalance -= txnData.amount;
        runningBalance = +runningBalance.toFixed(2);
        // compute balance
        const firstAddState = reducer(nextState, computeBalance({ txns: nextState.txns }));
        expect(firstAddState.accountBalance.current).toEqual(runningBalance);

        // add txn
        const secondAddState = reducer(firstAddState, addTxn(txnData));
        runningBalance -= txnData.amount;
        runningBalance = +runningBalance.toFixed(2);
        // compute balance
        const sumState = reducer(secondAddState, computeBalance({ txns: secondAddState.txns }));
        expect(sumState.accountBalance.current).toEqual(runningBalance);
        
        // remove txns
        const originalState = reducer(reducer(sumState, removeTxn(4)), removeTxn(5));
        runningBalance += txnData.amount;
        runningBalance += txnData.amount;
        runningBalance = +runningBalance.toFixed(2);
        // compute balance
        const finalState = reducer(originalState, computeBalance({ txns: originalState.txns }));
        expect(finalState.accountBalance.current).toEqual(runningBalance);

      });

    });
  
  });
});