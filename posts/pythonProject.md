---
title: "Django项目优化计划"
date: "2025-02-24"
---

## 1. 数据清洗（Pandas）与持久化设计

### **✅ 数据清洗（Pandas）**

- 读取不同市场的股票数据（美股、A 股、数字货币、外汇等）
- 处理 **缺失值**、**异常值**、**时间格式**
- 确保数据列类型一致，减少数据存储时的错误
- 转换数据格式，方便数据库存储（如 `float32` 替代 `float64` 以减少存储占用）

#### **📌 示例代码（数据清洗）**

```python
import pandas as pd

def clean_stock_data(filepath):
    df = pd.read_csv(filepath, parse_dates=["Date"])
    df.dropna(inplace=True)  # 删除缺失值
    df = df[df["Close"] > 0]  # 过滤掉无效数据
    df["Volume"] = df["Volume"].astype("int64")
    return df
```

### **✅ 数据持久化设计（数据库存储结构）**

- **各市场分表存储**（如 `us_stocks`, `cn_stocks`, `crypto_prices`）
- **主从数据库读写分离**
- **使用索引优化查询**

#### **📌 示例 MySQL 表结构**

```sql
CREATE TABLE us_stocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    trade_date DATE NOT NULL,
    open_price DECIMAL(10,2),
    high_price DECIMAL(10,2),
    low_price DECIMAL(10,2),
    close_price DECIMAL(10,2),
    volume BIGINT,
    area VARCHAR(10),  -- 修正VARCHAR长度
    SMA_10 DECIMAL(6,4),  -- 提高精度
    SMA_50 DECIMAL(6,4),
    RSI DECIMAL(5,2),
    UNIQUE(symbol, trade_date)  -- 确保每只股票每天数据唯一
);
-- 正确创建索引
CREATE INDEX idx_symbol_trade_date ON us_stocks (symbol, trade_date);
```

## 2. 接口限流（API 限流）

- 防止恶意请求，避免 API 过载
- 使用 **Django Ratelimit** 进行接口速率限制

#### **📌 示例代码（Django Ratelimit）**

```python
from django_ratelimit.decorators import ratelimit
from django.http import JsonResponse

@ratelimit(key='ip', rate='5/m', method='GET', block=True)
def stock_api(request):
    return JsonResponse({"message": "数据获取成功"})
```

📌 **限制：同一 IP 每分钟最多 5 次请求**

---

## 3. 隐藏项目文件

- **VS Code 隐藏** `__pycache__`, `migrations`:

```json
{
  "files.exclude": {
    "**/__pycache__": true,
    "**/*.pyc": true,
    "**/migrations": true,
    "**/.vscode": true
  }
}
```

- **Git 忽略无关文件** (`.gitignore`)

```bash
__pycache__/
*.pyc
migrations/
.vscode/
```

---

## 4. 实时数据更新

### **✅ 使用 WebSocket（Django Channels）**

- **前端 React 直接订阅 WebSocket**，实时更新数据
- **后端 Django 通过 Channels 发送数据**

#### **📌 Django Channels 代码**

```python
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class StockConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(json.dumps({"message": "连接成功"}))

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.send(json.dumps({"price": "100.5"}))
```

📌 **前端 React 直接订阅 WebSocket**

```javascript
const socket = new WebSocket("ws://localhost:8000/ws/stocks/");

socket.onmessage = function (event) {
  console.log("最新数据:", event.data);
};
```

### **✅ 定时轮询（备用方案）**

如果 WebSocket 方案不可用，可以使用 **定时轮询**:

```javascript
setInterval(() => {
  fetch("/stocks/api/")
    .then((response) => response.json())
    .then((data) => console.log("最新数据:", data));
}, 10000);
```

📌 **每 10 秒请求一次 `/stocks/api/`，获取最新数据**

---

## 5. 更多图表分析（K 线图 + 成交量）

### **✅ 增加成交量柱状图，让 K 线图更直观**

```python
import plotly.graph_objs as go

fig = go.Figure()
fig.add_trace(go.Candlestick(
    x=df['Date'],
    open=df['Open'],
    high=df['High'],
    low=df['Low'],
    close=df['Close'],
    name='K线图'
))
fig.add_trace(go.Bar(
    x=df['Date'],
    y=df['Volume'],
    name='成交量',
    marker_color='blue'
))
```

📌 **前端 React 直接使用 `react-plotly.js` 渲染**

```javascript
<Plot data={chartData.data} layout={chartData.layout} />
```

---

### **机器学习方法对比**

|       **方法**       | **适用时间** | **适合场景** |       **优点**       |      **缺点**      |
| :------------------: | :----------: | :----------: | :------------------: | :----------------: |
|   **RandomForest**   |    1-7 天    |   短期预测   |       易用、快       |  不能处理长期趋势  |
| **XGBoost/LightGBM** |   1-30 天    |  短中期预测  | 训练快，适用于大数据 |  不能建模长期依赖  |
|       **LSTM**       |   10-90 天   | 时间序列预测 |     适合长期趋势     | 计算量大，需要 GPU |
|   **Transformer**    |  30-180 天   | 长期趋势分析 |         强大         | 计算成本高，训练慢 |
|      **ARIMA**       |   1-14 天    |   短期预测   |        计算快        | 不能预测非线性趋势 |
|     **Prophet**      |  30-365 天   |   长期趋势   |    适用于周期数据    |  无法处理高频波动  |

---

### **ECharts vs Plotly 对比**

|    **对比项**     |              **ECharts**               |                  **Plotly**                   |
| :---------------: | :------------------------------------: | :-------------------------------------------: |
|   **开源/收费**   |           ✅ 完全开源 & 免费           |        🔸 免费（基础版），高级功能收费        |
|     **性能**      |       🚀 适合大数据量，GPU 加速        |             ⚡ 数据量大时可能卡顿             |
|    **交互性**     | 🎯 支持复杂交互（缩放、拖拽、工具栏）  |        ✅ 交互体验好，但略逊于 ECharts        |
|  **支持的图表**   |     📊 支持 K 线、成交量、大屏展示     |            📈 支持 K 线 & 科学绘图            |
| **前端/后端渲染** |     🌐 前端渲染（基于 JavaScript）     | 🌍 支持前端 + 后端渲染（Python 可生成静态图） |
|   **适合场景**    |   📈 金融可视化、大屏展示、数据看板    |      📊 数据科学、数据分析、交互式可视化      |
| **React 兼容性**  | ✅ 原生支持 React（echarts-for-react） |         🔸 通过 react-plotly.js 兼容          |
|   **动态更新**    |   🔄 更流畅（WebSocket / 实时数据）    |            🔄 支持，但大数据可能卡            |

---

## 6. github 设置成个人私有项目

## **✅ 结论**

- **优化数据库设计**，实现 **数据清洗 + 读写分离**
- **使用 Django Ratelimit 进行 API 限流**
- **隐藏不需要的项目文件，提高开发体验**
- **使用 WebSocket / 定时轮询 实现实时数据更新**
- **增强数据可视化，增加 K 线图成交量柱状图**

📌 这样 Django 项目就可以更高效、更高并发、更可维护！ 🚀
