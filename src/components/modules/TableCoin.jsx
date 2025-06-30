import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

function TableCoin({ coins, vs_currency }) {
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
  console.log(coins);
  return (
    <table>
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
          <tr key={coin.id}>
            <td>
              <img src={coin.image} alt="" />
              {coin.symbol}
            </td>
            <td>{coin.name}</td>
            <td>{`${coin.current_price} ${vs_currencyToSymbol()}`}</td>
            <td>{coin.price_change_percentage_24h}</td>
            <td>{coin.market_cap}</td>
            <td>
              {coin.price_change_percentage_24h > 0 ? (
                <img src={chartUp} alt="" />
              ) : (
                <img src={chartDown} alt="" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCoin;
