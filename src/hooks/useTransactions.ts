import { useContext } from "react";
import { TransactionsContext } from "../context/Transaction/transactionsContext";

export function useTransactions() {
  return useContext(TransactionsContext);
}
