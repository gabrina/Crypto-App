import Styles from "./Chart.module.css";
import { ConvertData } from "../../services/ConvertData";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");
  return (
    <div className={Styles.container}>
      <span onClick={() => setChart(false)} className={Styles.close}>
        X
      </span>
      <div className={Styles.chart}>
        <div className={Styles.name}>
          <img src={chart.coin.image} alt="" />
          <p>{chart.coin.name}</p>
        </div>
        <Graph data={ConvertData(chart, type)} type={type} />
        <div className={Styles.types}>
          <button
            className={type === "prices" ? Styles.selected : ""}
            onClick={() => setType("prices")}
          >
            Prices
          </button>
          <button
            className={type === "market_caps" ? Styles.selected : ""}
            onClick={() => setType("market_caps")}
          >
            Market Caps
          </button>
          <button
            className={type === "total_volumes" ? Styles.selected : ""}
            onClick={() => setType("total_volumes")}
          >
            Total Volumes
          </button>
        </div>
        <div className={Styles.details}>
          <div>
            <p>Current Price: </p>
            <span>{chart.coin.current_price}$</span>
          </div>
          <div>
            <p>ATH: </p>
            <span>{chart.coin.ath}</span>
          </div>
          <div>
            <p>Market Cap: </p>
            <span>{chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const Graph = ({ data, type }) => {
  return (
    <div className={Styles.graph}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={type} stroke="#094b7d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
