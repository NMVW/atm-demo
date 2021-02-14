export interface Txn {
  id?: string
  name: string
  amount: number
}

export interface AccountBalance {
  original: number
  current: number
}

export interface State {
  accountBalance: AccountBalance
  txns: Array<Txn> | []
}