import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/CryptoApi";

function HomePage() {
  const [coins, setCoins] = useState([]);

  const [vs_currency, setVs_currency] = useState("usd");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          await fetch(getCoinList(vs_currency));
        const json = await res.json();
        setCoins(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <header>
        <h1>Crypto app</h1>
        <h3>A practical practice on actual data</h3>
      </header>
      <TableCoin coins={coins} />
    </>
  );
}

export default HomePage;
