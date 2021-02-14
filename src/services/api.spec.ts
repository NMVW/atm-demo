import { fetchRecentTxns } from './api';

const mockApiData = {
  "transactions": [
    {
      "amount": 12.53,
      "name": "Uber"
    },
    {
      "amount": 15.4,
      "name": "Shake Shack"
    },
    {
      "amount": 55,
      "name": "Cable"
    },
    {
      "amount": 950,
      "name": "Rent"
    },
    {
      "amount": 9.99,
      "name": "Spotify"
    },
    {
      "amount": 11.5,
      "name": "Sweetgreen"
    },
    {
      "amount": 15.46,
      "name": "7 Eleven"
    },
    {
      "amount": 67,
      "name": "Trader Joe's"
    },
    {
      "amount": 120,
      "name": "Arlington Utilities"
    },
    {
      "amount": 30,
      "name": "9:30 Club"
    }
  ]
};

describe('API', function() {

  test.skip('txns endpoint should return mock data', async function() {
    const data = await fetchRecentTxns();
    expect(data.status).toEqual('online');
    expect(data.txns).toEqual(mockApiData.transactions);
  });

  test.skip('txns endpoint should return less than 1000 items', async function() {
    // WARNING: if reached a larger number of txn count, need to sync up with team on implementing a cursored pagination api to keep client latency manageable
    const data = await fetchRecentTxns();
    expect(data.txns.length < 1000).toEqual(true);
  });

});