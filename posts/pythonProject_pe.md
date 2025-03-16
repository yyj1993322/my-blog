---
title: "基本面数据"
date: "2025-03-10"
---
# 股票财务指标计算指南

## **📌 1. PE、EPS、ROE 介绍**

### **1️⃣ PE（Price-to-Earnings Ratio，市盈率）**

**公式：**

```math
PE = \frac{\text{股价}}{\text{每股收益（EPS）}}
```

**解释：**

- PE 表示 **投资者愿意为公司每 1 元的利润支付多少元的股价**。
- **高 PE**：市场看好公司未来增长，但可能被高估。
- **低 PE**：可能股价被低估，或市场对其未来增长没有信心。

### **2️⃣ EPS（Earnings Per Share，每股收益）**

**公式：**

```math
EPS = \frac{\text{净利润}}{\text{总股本}}
```

**解释：**

- EPS 反映 **公司每股的盈利能力**。
- **高 EPS**：公司盈利能力强。
- **低 EPS**：盈利能力较弱，或公司亏损。

### **3️⃣ ROE（Return on Equity，净资产收益率）**

**公式：**

```math
ROE = \frac{\text{净利润}}{\text{股东权益}} \times 100\%
```

**解释：**

- ROE 反映 **公司利用股东资金赚钱的能力**。
- **高 ROE**：资金利用率高，股东回报率高。
- **低 ROE**：公司盈利能力弱或资金运用效率不佳。

## **📌 2. 用 Python 计算 PE、EPS、ROE**

```python
# 定义财务数据
price = 100  # 股价
net_income = 50_000_000_000  # 净利润（单位：元）
total_shares = 10_000_000_000  # 总股本（单位：股）
equity = 200_000_000_000  # 股东权益（单位：元）

# 计算 EPS（每股收益）
eps = net_income / total_shares

# 计算 PE（市盈率）
pe = price / eps

# 计算 ROE（净资产收益率）
roe = (net_income / equity) * 100  # 转换为百分比

# 输出结果
print(f"每股收益（EPS）：{eps:.2f} 元")
print(f"市盈率（PE）：{pe:.2f}")
print(f"净资产收益率（ROE）：{roe:.2f}%")
```

### **📊 多个公司批量计算**

```python
import pandas as pd

# 创建数据
data = {
    "company": ["A公司", "B公司", "C公司"],
    "price": [100, 50, 80],  # 股价
    "net_income": [50e9, 30e9, 40e9],  # 净利润
    "total_shares": [10e9, 5e9, 8e9],  # 总股本
    "equity": [200e9, 120e9, 150e9],  # 股东权益
}

# 转换为 DataFrame
df = pd.DataFrame(data)

# 计算 EPS、PE、ROE
df["EPS"] = df["net_income"] / df["total_shares"]
df["PE"] = df["price"] / df["EPS"]
df["ROE"] = (df["net_income"] / df["equity"]) * 100  # 以百分比表示

# 显示结果
df
```

## **📌 3. 如何获取股票数据**

### **🔹 1. 使用 ****\`\`**** 获取 A 股数据**

```python
import akshare as ak

# 获取 A 股上市公司财务数据
stock_financials = ak.stock_financial_abstract(symbol="600519")  # 600519 是贵州茅台的股票代码
print(stock_financials.head())
```

### **🔹 2. 使用 ****\`\`**** 获取美股数据**

```python
import yfinance as yf

# 获取苹果公司（AAPL）的财务数据
stock = yf.Ticker("AAPL")
price = stock.history(period="1d")["Close"].iloc[-1]
net_income = stock.financials.loc["Net Income"].iloc[0]
equity = stock.balance_sheet.loc["Total Stockholder Equity"].iloc[0]
total_shares = stock.info["sharesOutstanding"]

print(f"股价: {price}, 净利润: {net_income}, 总股本: {total_shares}, 股东权益: {equity}")
```

### **🔹 3. 手动获取数据来源**

| **市场**  | **官网**                                                              |
| ------- | ------------------------------------------------------------------- |
| A 股（沪深） | [上海证券交易所](https://www.sse.com.cn/) / [深圳证券交易所](http://www.szse.cn/) |
| 港股      | [香港交易所](https://www.hkex.com.hk/)                                   |
| 美股      | [纳斯达克](https://www.nasdaq.com/) / [纽约证券交易所](https://www.nyse.com/)  |

## **📌 4. 结合 Python 自动获取 A 股 / 美股数据**

```python
import akshare as ak
import yfinance as yf

def get_stock_data(symbol, market="A"):
    if market == "A":
        stock_data = ak.stock_financial_abstract(symbol=symbol)
        net_income = stock_data["净利润"][0]
        equity = stock_data["股东权益合计"][0]
        total_shares = stock_data["总股本"][0]
        price = ak.stock_zh_a_spot_em().query(f"代码 == '{symbol}'")["最新价"].values[0]
    else:
        stock = yf.Ticker(symbol)
        net_income = stock.financials.loc["Net Income"].iloc[0]
        equity = stock.balance_sheet.loc["Total Stockholder Equity"].iloc[0]
        total_shares = stock.info["sharesOutstanding"]
        price = stock.history(period="1d")["Close"].iloc[-1]
    return {"symbol": symbol, "price": price, "net_income": net_income, "equity": equity, "total_shares": total_shares}

# 获取 A 股贵州茅台（600519）数据
maotai_data = get_stock_data("600519", market="A")
print(maotai_data)

# 获取美股苹果公司（AAPL）数据
apple_data = get_stock_data("AAPL", market="US")
print(apple_data)
```

---

## **📌 5. 结论**

- **PE 适合估值对比**，EPS **反映公司盈利能力**，ROE **反映股东回报**。
- **Python 可以自动抓取数据，并进行计算**。
- **建议使用 **``** 获取美股数据**。

🚀 **这样你就可以高效收集股票数据，并计算 PE、EPS、ROE 了！🔥**

