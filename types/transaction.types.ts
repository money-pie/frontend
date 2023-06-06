import { Category, Kind, Month, RuCategory, RuKind } from './constants';

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

export interface TransactionResponse {
  id: string;
  sum: number;
  category: string;
  kind: string;
  date: string;
  personal: boolean;
  description: string;
  userId: string;
  groupId: string;
}

export interface PieData {
  sum: number;
  category: string;
}

export interface TransactionDto {
  sum: number;
  category: RuCategory | undefined;
  kind: RuKind | undefined;
  date: string | undefined;
  personal: boolean;
  description: string;
}


export interface TransactionQuery {
  personal: boolean,
  category: Category | undefined,
  kind: Kind |undefined,
  month: Month | undefined,
  year: number,
  page?: number,
  limit?: number,
}

export class PieDataClass implements PieData {
  sum: number;
  category: string;

  constructor(sum: number, category: string) {
    this.sum = sum;
    this.category = category;
  }
}
