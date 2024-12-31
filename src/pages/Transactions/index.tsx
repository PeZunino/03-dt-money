import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { useTransactions } from "../../hooks/useTransactions";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

export function Transactions() {
  const transactions = useTransactions("transactions");

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(
              ({ category, createdAt, description, id, price, type }) => {
                return (
                  <tr key={id}>
                    <td width="50%">{description}</td>
                    <td>
                      <PriceHighlight $variant={type}>
                        {type === "outcome" && "- "}
                        {priceFormatter.format(price)}
                      </PriceHighlight>
                    </td>
                    <td>{category}</td>
                    <td>{dateFormatter.format(new Date(createdAt))}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
