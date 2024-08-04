import React, { useEffect } from 'react';
import Card from '../common/Card';

const TradingChart = ({ cryptocurrency }) => {

  useEffect(() => {
    if (cryptocurrency && window.TradingView) {
      new window.TradingView.widget({
        "container_id": "tradingview_chart",
        "width": "100%",
        "height": 500,
        "symbol": `BINANCE:${cryptocurrency}`,
        "interval": "D",
        "theme": 'dark',
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": false,
        "hideideas": true
      });
    }
  }, [cryptocurrency]);

  return (
    <Card title="Trading Chart">
      <div id="tradingview_chart" className="chart"></div>
    </Card>
  );
};

export default TradingChart;
