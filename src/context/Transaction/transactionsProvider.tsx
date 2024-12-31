import { ReactNode, useEffect, useState } from "react";
import {
  CreateTransactionInput,
  Transactions,
  TransactionsContext,
} from "./transactionsContext";
import { api } from "../../lib/axios";

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        q: query,
        _sort: "createdAt",
        _order: "desc",
      },
    });
    setTransactions(response.data);
  }

  async function createTransaction({
    category,
    description,
    price,
    type,
  }: CreateTransactionInput) {
    const response = await api.post("/transactions", {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [...state, response.data]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
