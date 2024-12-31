import { ReactNode, useCallback, useEffect, useState } from "react";
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

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("/transactions", {
      params: {
        q: query,
        _sort: "createdAt",
        _order: "desc",
      },
    });
    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(
    async ({ category, description, price, type }: CreateTransactionInput) => {
      const response = await api.post("/transactions", {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      });

      setTransactions((state) => [...state, response.data]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
