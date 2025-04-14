import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "#FF006F", "#FF9900", "#EEFF00", "#1EFF00", "#00FBFF",
  "#2600FF", "#7700FF", "#FF00A6", "#FF0000", "#FF9090"
];

function MarketShare() {
  const [topCoins, setTopCoins] = useState([]);

  useEffect(() => {
    fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=10")
      .then((res) => res.json())
      .then((data) => {
        const coins = data?.Data?.LIST;
        if (!coins || !Array.isArray(coins)) return;

        const validCoins = coins
          .filter(coin => {
            const cap = parseFloat(coin.TOTAL_MKT_CAP_USD);
            return !isNaN(cap) && cap > 0;
          })
          .map(coin => ({
            name: coin.NAME,
            marketCap: parseFloat(coin.TOTAL_MKT_CAP_USD),
          }));

        const totalCap = validCoins.reduce((sum, coin) => sum + coin.marketCap, 0);
        if (totalCap === 0) return;

        const coinsWithPercent = validCoins.map(coin => ({
          name: coin.name,
          value: (coin.marketCap / totalCap) * 100,
        }));

        setTopCoins(coinsWithPercent);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{padding: "10px", width: "100%", height: "400px" }}>
      <h2>Top 10 Coin Market Share</h2>
      {topCoins.length === 0 ? (
        <p>Loading or no data found.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
          <Pie
                data={topCoins}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                // label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
                >
                {topCoins.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip
                formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MarketShare;
