import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/CryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";
import Layout from "../../Layouts/Layout";
// import { isErrorBarRelevantForAxisType } from "recharts/types/state/selectors/axisSelectors";

function HomePage() {
  const [error, setError] = useState(false);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState(null);

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
        // setIsLoading(false);
      }
    };
    fetchData();
  }, [vs_currency, page]);
  return (
    <Layout>
      <Search vs_currency={vs_currency} setVs_currency={setVs_currency} />
      <TableCoin
        coins={coins}
        vs_currency={vs_currency}
        isLoading={isLoading}
        error={error}
        chart={chart}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </Layout>
  );
}

export default HomePage;
