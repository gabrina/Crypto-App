import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/CryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [vs_currency, setVs_currency] = useState("usd");
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(getCoinList(vs_currency, page));
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [vs_currency, page]);
  return (
    <div>
      <header>
        <h1>Crypto app</h1>
        <h3>A practical practice on actual data</h3>
      </header>
      <Search vs_currency={vs_currency} setVs_currency={setVs_currency} />
      <TableCoin
        coins={coins}
        vs_currency={vs_currency}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default HomePage;
