---
title: "股票投资分析方法"
date: "2025-02-17"
---
## 1. 基本面分析（Fundamental Analysis）
适用于长期投资，主要关注公司的财务状况、行业前景等。

### 财务指标

- **市盈率（P/E Ratio）**：低于行业平均水平可能被低估。
- **市净率（P/B Ratio）**：反映公司净资产的市场定价。
- **股息收益率（Dividend Yield）**：适用于稳定分红的公司。
- **净利润增长率（EPS Growth）**：衡量公司盈利能力的增长。

📌 **示例（使用 yfinance 获取财务数据）**

```python
import yfinance as yf

stock = yf.Ticker("AAPL")
financials = stock.financials
print(financials)
```

## 2. 技术分析（Technical Analysis）
适用于短期或波段交易，主要基于价格和交易量来预测走势。

### 移动平均线（MA, EMA）

- **策略**：当短期均线（如 10 日均线）上穿长期均线（如 50 日均线），形成“金叉”，可能是买入信号。

```python
import pandas as pd
import yfinance as yf

data = yf.download("AAPL", period="1y")
data['SMA_10'] = data['Close'].rolling(window=10).mean()
data['SMA_50'] = data['Close'].rolling(window=50).mean()

buy_signal = data[data['SMA_10'] > data['SMA_50']]
print(buy_signal.tail())
```

### 相对强弱指数（RSI）

- **策略**：RSI 低于 30，超卖，可能是买入信号；高于 70，超买，可能是卖出信号。

```python
import talib

data['RSI'] = talib.RSI(data['Close'], timeperiod=14)
buy_signal = data[data['RSI'] < 30]  # 超卖区间
print(buy_signal.tail())
```

## 3. 机器学习预测（Machine Learning）
如果你想用 AI 预测是否买入，可以使用随机森林、LSTM 或 XGBoost。

### 特征工程

提取均线、成交量、RSI、MACD 等特征。使用 sklearn 训练分类模型。

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# 构造特征
data['Target'] = (data['Close'].shift(-1) > data['Close']).astype(int)  # 明天上涨=1
features = ['SMA_10', 'SMA_50', 'RSI']
X = data[features].dropna()
y = data['Target'].dropna()

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# 预测明天是否上涨
pred = model.predict(X_test)
print(pred)
```

## 4. 组合策略

综合基本面 + 技术面 + 机器学习，可以设定如下规则：
- **基本面筛选**：市盈率合理、净利润增长稳定
- **技术面确认**：RSI 低于 30，短期均线金叉
- **机器学习预测**：模型预测明天上涨概率 > 70%

## 总结

- 🔹 **长期投资** → 基本面分析
- 🔹 **短线交易** → 技术分析（RSI、均线、MACD）
- 🔹 **智能决策** → 机器学习（随机森林、LSTM）
