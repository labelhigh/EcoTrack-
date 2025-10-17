import React from 'react';
import Card from './ui/Card';
import { SettingsIcon } from './icons';

const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">設定</h1>
      <Card>
        <div className="text-center py-20 text-gray-500">
          <SettingsIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-700">平台管理與設定</h2>
          <p>此功能正在開發中。</p>
          <p className="mt-1 text-sm max-w-md mx-auto">未來您將可以在此處管理您的組織資訊、使用者帳戶與權限、API 整合、以及通知偏好設定。</p>
        </div>
      </Card>
    </div>
  );
};

export default Settings;