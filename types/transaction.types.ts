import { Category, RuCategory, RuKind } from './constants';

export interface TransactionsInfo {
  sum: number;
  transactionsInfo: TransactionInfo[];
}

export interface TransactionInfo {
  category: Category;
  count: number;
  sum: number;
}

export interface TransactionsList {
  sum: number;
  transactionsInfo: Transaction[];
}

export interface Transaction {
  id: string;
  sum: number;
  category: string;
  kind: string;
  date: string;
  personal: boolean;
  description: string;
  author: string;
}

export interface PieData {
  sum: number;
  category: string;
}

export class PieDataClass implements PieData {
  sum: number;
  category: string;

  constructor(sum: number, category: string) {
    this.sum = sum;
    this.category = category;
  }
}
