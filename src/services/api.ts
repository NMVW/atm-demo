import { Txn } from '../interfaces';

const txns_api_url = process.env.REACT_APP_API_TXNS_URL as string;

interface AppResponse {
  status: 'online' | 'offline' | 'error'
  txns: Array<Txn> | []
}

// wrapper for timing out outbound fetch requests
async function fetchWithTimeout(resource: string, options: { timeout: number }) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });

  clearTimeout(id);

  return response;
}

export async function fetchRecentTxns(): Promise<AppResponse> {

  try {
    const response = await fetchWithTimeout(txns_api_url, { timeout: 8000 });
    const data = await response.json();
    return {
      status: 'online',
      txns: data.transactions,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      // request timed out
      return {
        status: 'offline',
        txns: [],
      };
    } else {
      return {
        status: 'error',
        txns: [],
      };
    }
  }
}