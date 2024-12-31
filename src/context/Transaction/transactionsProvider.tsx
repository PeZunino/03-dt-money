import { ReactNode, useEffect, useState } from "react";
import { Transactions, TransactionsContext } from "./transactionsContext";

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  async function fetchTransactions(query?: string) {
    const url = new URL("http://localhost:3000/transactions");

    if (query) url.searchParams.append("q", query);

    const response = await fetch(url);
    const data = await response.json();

    console.log(url);
    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
