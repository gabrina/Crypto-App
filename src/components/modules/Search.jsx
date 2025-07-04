import React, { useEffect, useState } from "react";
import { searchCoin } from "../../services/CryptoApi";
import { RotatingLines } from "react-loader-spinner";
import Styles from "../modules/Search.module.css";
function Search({ vs_currency, setVs_currency }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const controler = new AbortController();
    setResult([]);
    if (!query) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(searchCoin(query), {
          signal: controler.signal,
        });
        const json = await res.json();
        setResult(json.coins);
        if (json.coins) {
          setResult(json.coins);
          setIsLoading(false);
        } // in case we receive unexpected response
        else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") console.log(error);
      }
    };
    setIsLoading(true);

    fetchData();
    return () => {
      controler.abort();
    };
  }, [query]);
  return (
    <div className={Styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        name="vs-currency"
        value={vs_currency}
        onChange={(e) => setVs_currency(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      <div className={`${Styles.searchResult} ${!query?Styles.hidden:null}` }>
        {isLoading ? (
          <RotatingLines
            strokeColor="#094b7d"
            strokeWidth="2"
            height="50px"
            width="50px"
          />
        ) : (
          <ul>
            {result.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt="" />
                <span>{coin.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
