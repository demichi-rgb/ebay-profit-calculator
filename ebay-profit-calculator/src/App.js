import React, { useState } from "react";

function App() {
  const categoryFees = {
    "エレクトロニクス": 0.12,
    "ファッション": 0.15,
    "本・メディア": 0.14,
    "その他": 0.135
  };

  const [costYen, setCostYen] = useState("");
  const [sellUsd, setSellUsd] = useState("");
  const [weight, setWeight] = useState("");
  const [rate, setRate] = useState("");
  const [category, setCategory] = useState("エレクトロニクス");
  const [feeRate, setFeeRate] = useState(categoryFees["エレクトロニクス"]);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    setFeeRate(categoryFees[selected]);
  };

  const getShippingCost = () => {
    const w = parseFloat(weight);
    if (isNaN(w)) return 0;

    if (w <= 100) return 300;
    if (w <= 500) return 700;
    if (w <= 1000) return 1200;
    return 2000;
  };

  const calculateProfit = () => {
    const cost = parseFloat(costYen);
    const sell = parseFloat(sellUsd);
    const fx = parseFloat(rate);
    const fee = sell * fx * feeRate;
    const shipping = getShippingCost();

    if (isNaN(cost) || isNaN(sell) || isNaN(fx)) return 0;

    const revenueYen = sell * fx;
    const profit = revenueYen - cost - fee - shipping;
    return profit.toFixed(0);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}>
      <h2>eBay利益計算ツール</h2>

      <div>
        <label>仕入価格（円）：</label>
        <input type="number" value={costYen} onChange={(e) => setCostYen(e.target.value)} />
      </div>

      <div>
        <label>販売価格（ドル）：</label>
        <input type="number" value={sellUsd} onChange={(e) => setSellUsd(e.target.value)} />
      </div>

      <div>
        <label>為替レート（1ドル＝円）：</label>
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>

      <div>
        <label>重量（g）：</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>

      <div>
        <label>カテゴリー選択：</label>
        <select value={category} onChange={handleCategoryChange}>
          {Object.keys(categoryFees).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "20px", fontWeight: "bold" }}>
        想定利益：{calculateProfit()} 円
      </div>
    </div>
  );
}

export default App;
