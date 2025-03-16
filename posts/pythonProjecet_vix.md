---
title: "市场情绪指标（VIX & Put/Call Ratio）"
date: "2025-03-10"
---

## **📌 1. 市场情绪指标介绍**

市场情绪指标用于衡量投资者的恐慌、贪婪或风险偏好。其中，**VIX（恐慌指数）** 和 **Put/Call Ratio（看跌/看涨比率）** 是最常用的两个指标。

---

## **1️⃣ VIX（Volatility Index，恐慌指数）**

### **📌 VIX 指数是什么？**

VIX（CBOE Volatility Index）是芝加哥期权交易所（CBOE）发布的**市场波动率指数**，反映了投资者对未来 30 天 S&P 500 指数波动性的预期。

### **✅ 计算方式**

- VIX 主要基于 **S&P 500 指数期权** 的隐含波动率计算得出。
- 当**市场不确定性增加（波动率变大）**，VIX 指数会上升。
- 当**市场平稳、投资者情绪乐观**，VIX 指数会下降。

### **✅ 参考数值**

- **VIX < 15**：市场稳定，投资者情绪乐观（低恐慌）。
- **VIX 介于 15-25 之间**：市场处于正常波动状态。
- **VIX > 25**：市场波动较大，投资者情绪紧张。
- **VIX > 40**：极端市场恐慌，例如 2008 年金融危机、2020 年疫情期间。

### **✅ VIX 指数的作用**

1. **衡量市场风险**：VIX 高，说明市场不稳定，风险较大。
2. **恐慌 vs. 贪婪**：
   - VIX 高 → 恐慌情绪强 → 可能是市场底部（买入机会）。
   - VIX 低 → 过度乐观 → 可能市场过热（风险增加）。
3. **避险工具**：投资者可以交易 VIX 期货、期权对冲市场风险。

### **✅ 真实案例**

- **2020 年 3 月疫情爆发**：VIX 一度飙升至 **85**，显示市场极端恐慌。
- **2023 年股市平稳上涨**：VIX 维持在 **15-20** 之间，显示市场情绪乐观。

---

## **2️⃣ Put/Call Ratio（看跌/看涨比率）**

### **📌 Put/Call Ratio 是什么？**

Put/Call Ratio（看跌/看涨比率）用于衡量投资者的**市场方向偏好**，通过**比较看跌期权（Put Options）和看涨期权（Call Options）的交易量**来反映市场情绪。

### **✅ 计算公式**

```math
Put/Call Ratio = \frac{\text{Put 交易量}}{\text{Call 交易量}}
```

- **比率 > 1**，说明市场上看跌期权交易量大于看涨期权，投资者情绪偏向悲观（看跌）。
- **比率 < 1**，说明看涨期权交易量大于看跌期权，投资者情绪偏向乐观（看涨）。

### **✅ 参考数值**

| **Put/Call Ratio** | **市场情绪**       |
| ------------------------ | ------------------------ |
| **< 0.7**          | 市场乐观（可能过热）     |
| **0.7 - 1.0**      | 中性（正常波动）         |
| **> 1.0**          | 市场悲观（恐慌情绪较重） |
| **> 1.5**          | 极端恐慌（可能市场底部） |

### **✅ 作用**

1. **情绪逆向指标**：
   - **比率高（>1.0）**：市场情绪悲观，可能是市场底部（买入信号）。
   - **比率低（<0.7）**：市场情绪过于乐观，可能存在回调风险。
2. **短线交易信号**：
   - **Put/Call Ratio 突然飙升** → 可能市场即将反弹。
   - **Put/Call Ratio 过低** → 可能市场上涨过快，存在调整风险。

### **✅ 真实案例**

- **2008 年金融危机**：Put/Call Ratio **>1.5**，市场恐慌，随后迎来牛市反弹。
- **2021 年美股牛市**：Put/Call Ratio **< 0.6**，市场极端乐观，随后市场调整。

---

## **📌 3. VIX & Put/Call Ratio 的区别**

| **指标**           | **衡量内容**     | **高数值的意义** | **低数值的意义** |
| ------------------------ | ---------------------- | ---------------------- | ---------------------- |
| **VIX**            | 市场波动率（恐慌指数） | 市场恐慌，波动性增加   | 市场平稳，乐观情绪高   |
| **Put/Call Ratio** | 投资者方向性偏好       | 看跌情绪强，可能是底部 | 过度看涨，可能调整     |

---

## **📌 4. 结论**

- **VIX 主要衡量市场波动性和恐慌程度**，用于**判断市场风险和避险需求**。
- **Put/Call Ratio 衡量市场情绪的多空偏好**，用于**识别市场是否过热或恐慌**。
- **两个指标结合使用**：
  - **VIX 高 + Put/Call Ratio 高** → 市场恐慌，可能是买入机会。
  - **VIX 低 + Put/Call Ratio 低** → 市场过热，可能有回调风险。

# 使用 Python 获取 VIX & Put/Call Ratio 数据

## **📌 1. 获取 VIX 指数**

### **方法 1：使用 `yfinance` 获取 VIX**

`yfinance` 提供了 VIX 指数的历史数据。

```python
import yfinance as yf

# 获取 VIX 指数数据
vix = yf.Ticker("^VIX")

# 获取最近 1 个月的历史数据
vix_data = vix.history(period="1mo")

# 显示最新的 VIX 数据
print(vix_data.tail())
```

**✅ 适用于**：获取 VIX **历史数据、当前指数**。

---

### **方法 2：使用 `AkShare` 获取 VIX**

`AkShare` 是中国市场常用的金融数据工具库，可以直接获取 VIX 指数。

```python
import akshare as ak

# 获取 VIX 指数
vix_index = ak.index_vix(symbol="VIX")

# 显示最新数据
print(vix_index.tail())
```

**✅ 适用于**：国内投资者，AkShare 数据更新较快。

---

### **方法 3：使用 `requests` + `BeautifulSoup` 爬取 CBOE 官网 VIX 数据**

```python
import requests
from bs4 import BeautifulSoup

# CBOE VIX 数据网址
url = "https://www.marketwatch.com/investing/index/vix"

# 发送请求
headers = {"User-Agent": "Mozilla/5.0"}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

# 查找 VIX 指数
vix_value = soup.find("bg-quote", class_="value").text

print(f"当前 VIX 指数：{vix_value}")
```

**✅ 适用于**：实时获取 VIX 现价。

---

## **📌 2. 获取 Put/Call Ratio**

### **方法 1：使用 `AkShare` 获取 Put/Call Ratio**

```python
import akshare as ak

# 获取 CBOE 期权市场的 Put/Call Ratio 数据
put_call_ratio = ak.option_cboe_put_call_ratio()

# 显示最新数据
print(put_call_ratio.tail())
```

**✅ 适用于**：获取 **Put/Call Ratio 历史数据**。

---

### **方法 2：使用 `requests` 爬取 CBOE 官网数据**

```python
import requests
import pandas as pd

# CBOE 期权 Put/Call Ratio 数据地址
url = "https://www.cboe.com/us/options/market_statistics/daily/"

# 发送请求
response = requests.get(url)
df_list = pd.read_html(response.text)

# 查找 Put/Call Ratio 数据（一般在第一张表）
put_call_ratio = df_list[0]
print(put_call_ratio.head())
```

**✅ 适用于**：CBOE 官网最新的 **Put/Call Ratio**。

---

## **📌 3. 结合 VIX 和 Put/Call Ratio 进行市场情绪分析**

```python
import yfinance as yf
import akshare as ak

# 获取 VIX 指数
vix = yf.Ticker("^VIX")
vix_value = vix.history(period="1d")["Close"].iloc[-1]

# 获取 Put/Call Ratio
put_call_ratio = ak.option_cboe_put_call_ratio().iloc[-1]["Total Put/Call Ratio"]

# 输出数据
print(f"当前 VIX 指数: {vix_value:.2f}")
print(f"当前 Put/Call Ratio: {put_call_ratio:.2f}")

# 判断市场情绪
if vix_value > 25 and put_call_ratio > 1.0:
    print("市场恐慌情绪较强，可能是买入机会。")
elif vix_value < 15 and put_call_ratio < 0.7:
    print("市场过热，可能存在回调风险。")
else:
    print("市场情绪正常。")
```

**✅ 适用于**：

- **自动获取 VIX 和 Put/Call Ratio**
- **判断市场是否恐慌或过热**
- **辅助投资决策**

---

## **📌 4. 结论**

| **方法**                  | **适用于** | **优点**              | **缺点**       |
| ------------------------------- | ---------------- | --------------------------- | -------------------- |
| `yfinance` 获取 VIX           | 美股投资者       | API 稳定，历史数据全        | 仅限美股             |
| `AkShare` 获取 VIX            | A 股 & 美股      | 数据全，支持 Put/Call Ratio | 需要安装 AkShare     |
| `requests` 爬取 VIX           | 需要实时数据     | 可获取 CBOE 官网最新数据    | 可能需要调整解析方式 |
| `AkShare` 获取 Put/Call Ratio | 期权市场交易者   | 直接获取历史数据            | 仅适用于 CBOE        |
| `requests` 爬取 CBOE 官网     | 需要最新数据     | 可获取最新市场数据          | 可能 HTML 结构变动   |

✅ **推荐方案**

1. **如果是美股投资者**，建议用 `yfinance` 获取 VIX 和 `AkShare` 获取 Put/Call Ratio。
2. **如果是国内投资者**，建议使用 `AkShare`，获取 A 股和美股的相关数据。
3. **如果想要爬取最新数据**，可以用 `requests` + `BeautifulSoup` 直接从 CBOE 官网爬取数据。

🚀 **这样你就可以用 Python 自动获取市场情绪数据，并进行分析了！🔥**
