import { ReactNode, useEffect, useState } from "react";
import { Transactions, TransactionsContext } from "./transactionsContext";

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();

    setTransactions(data);
    console.log(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
