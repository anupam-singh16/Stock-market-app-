// StockChart.js
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

function StockChart() {
  const [stockData, setStockData] = useState({});
  const [symbol, setSymbol] = useState({});
  const [searchSymbol, setSearchSymbol] = useState("IBM");
  //   console.log(symbol["2. Symbol"], "symbol");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const API_KEY = "72J5266S0H2QL30G";
        let StockSymbol = "GOOG";
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${searchSymbol}&interval=5min&outputsize=full&apikey=demo`
        );
        setStockData(response.data["Time Series (5min)"]);
        setSymbol(response?.data["Meta Data"]);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [searchSymbol]);

  const dates = stockData ? Object.keys(stockData) : [];
  const symbolName = stockData ? Object.keys(symbol) : [];
  //   console.log(symbolName, "symbolName");
  const closingPrices = dates.map((date) =>
    parseFloat(stockData[date]["4. close"] || 0)
  );
  console.log(dates, "dates");
  console.log(closingPrices, "closingPrices");

  return (
    <center>
      <h2>Stock Chart</h2>
      <p
        style={{
          color: "blue",
          fontFamily: "sans-serif",
          fontWeight: "bolder",
        }}
      >
        Symbol: {symbol ? symbol["2. Symbol"] : ""}
      </p>

      <input
        type="text"
        onChange={(e) => setSearchSymbol(e.target.value || "IBM")}
      />
      <Plot
        data={[
          {
            x: dates,
            y: closingPrices,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          width: 1200,
          height: 500,
          title: "Stock Market",
        }}
      />
    </center>
  );
}

export default StockChart;
