import React from 'react';
import Card from './ui/Card';
import { ChartInfographicIcon } from './icons';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">數據分析</h1>
      <Card>
        <div className="text-center py-20 text-gray-500">
          <ChartInfographicIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-700">深度數據分析與洞察</h2>
          <p>此功能正在開發中。</p>
          <p className="mt-1 text-sm max-w-md mx-auto">未來您將可以在此處查看詳細的排放趨勢、設定減排目標、進行行業基準比較並生成客製化分析報告。</p>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;