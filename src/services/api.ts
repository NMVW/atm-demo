import { Txn } from '../interfaces';

const txns_api_url = process.env.REACT_APP_API_TXNS_URL as string;

interface AppResponse {
  status: 'online' | 'offline' | 'error'
  txns: Array<Txn> | []
}

export async function fetchRecentTxns(): Promise<AppResponse> {

  if (!txns_api_url) {
    console.error('Offline mode: Txn API Url env var not set');
    return {
      status: 'offline',
      txns: [],
    };
  }

  try {
    const response = await fetch(txns_api_url);
    const data = await response.json();
    return {
      status: 'online',
      txns: data.transactions,
    };
  } catch (error) {
    console.error('Handle API call error gracefully', error);
    return {
      status: 'error',
      txns: [],
    };
  }
}