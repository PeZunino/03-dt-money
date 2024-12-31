import {
  TransactionContextType,
  TransactionsContext,
} from "../context/Transaction/transactionsContext";
import { useContextSelector } from "use-context-selector";

export function useTransactions<K extends keyof TransactionContextType>(
  value: K
): TransactionContextType[K] {
  return useContextSelector(TransactionsContext, (context) => {
    return context[value];
  });
}
