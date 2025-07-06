import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import { marketChart } from "../../services/CryptoApi";

import { RotatingLines } from "react-loader-spinner";
import Styles from "./TableCoin.module.css";

function TableCoin({ coins, vs_currency, isLoading, setChart, error }) {
  return (
    <div className={Styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#094b7d" strokeWidth="2" />
      ) : (
        <table className={Styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                key={coin.id}
                coin={coin}
                vs_currency={vs_currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
      {/* {error && <h3>Something went wrong</h3>} */}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ coin, vs_currency, setChart }) => {
  const {
    id,
    name,
    symbol,
    image,
    current_price,
    market_cap,
    price_change_percentage_24h: price_change,
  } = coin;
  const vs_currencyToSymbol = () => {
    switch (vs_currency) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "jpy":
        return "¥";
      default:
        break;
    }
  };

  const showHandeler = async () => {
    try {
      const response = await fetch(marketChart(id));
      const json = await response.json();
      setChart({ ...json, coin});
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={Styles.symbol} onClick={showHandeler}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{`${current_price.toLocaleString()} ${vs_currencyToSymbol()}`}</td>
      <td className={price_change > 0 ? Styles.priceUp : Styles.priceDown}>
        {price_change.toFixed(2)}%
      </td>
      <td>{market_cap.toLocaleString()}</td>
      <td>
        {price_change > 0 ? (
          <img src={chartUp} alt={name} />
        ) : (
          <img src={chartDown} alt={name} />
        )}
      </td>
    </tr>
  );
};
