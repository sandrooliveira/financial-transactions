import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const createBalance = (
      balance: Balance,
      transaction: Transaction,
    ): Balance => {
      const newBalance = { ...balance };
      const { value, type } = transaction;

      newBalance[type] = balance[type] + value;
      newBalance.total = newBalance.income - newBalance.outcome;

      return newBalance;
    };

    return this.transactions.reduce(createBalance, {
      income: 0,
      outcome: 0,
      total: 0,
    });
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
