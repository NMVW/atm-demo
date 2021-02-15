export interface Txn {
  id?: number
  name: string
  amount: number
}

export interface AccountBalance {
  original: number
  current: number
}

export interface State {
  accountBalance: AccountBalance
  txns: {
    status: 'online' | 'pending' | 'error' | ''
    list: Array<Txn> | []
  }
}