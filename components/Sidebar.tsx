import React from 'react';
import type { View } from '../types';
import { 
    DashboardIcon, 
    ProjectsIcon, 
    MarketplaceIcon, 
    ReportingIcon, 
    InventoryIcon, 
    AnalyticsIcon, 
    SettingsIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from './icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const navItems = [
  { view: 'dashboard', label: '儀表板', icon: DashboardIcon },
  { view: 'projects', label: '專案管理', icon: ProjectsIcon },
  { view: 'marketplace', label: '碳權市場', icon: MarketplaceIcon },
  { view: 'reporting', label: '報告中心', icon: ReportingIcon },
  { view: 'inventory', label: '碳盤查', icon: InventoryIcon },
  { view: 'analytics', label: '數據分析', icon: AnalyticsIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isCollapsed, setIsCollapsed }) => {
  return (
    <aside className={`bg-white text-gray-700 flex flex-col relative transition-all duration-300 ease-in-out border-r border-gray-200 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <div className={`text-primary-600 text-2xl font-bold transition-opacity duration-200 flex items-center gap-2 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 16H8V14H11V16ZM11 12H8V10H11V12ZM16 16H13V14H16V16ZM16 12H13V10H16V12Z" fill="currentColor"/>
            <path d="M15.41 6.51C15.05 5.79 14.28 5.25 13.39 5.25H10.61C9.72 5.25 8.95 5.79 8.59 6.51L7.38 9H16.62L15.41 6.51Z" fill="currentColor" fillOpacity="0.7"/>
          </svg>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>EcoTrack</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view as View)}
              title={isCollapsed ? item.label : ''}
              className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`h-5 w-5 ${!isCollapsed ? 'mr-3' : ''}`} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
            onClick={() => setCurrentView('settings')}
            title={isCollapsed ? '設定' : ''}
            className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'settings'
                ? 'bg-primary-50 text-primary-600'
                : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
            } ${isCollapsed ? 'justify-center' : ''}`}
        >
            <SettingsIcon className={`h-5 w-5 ${!isCollapsed ? 'mr-3' : ''}`} />
            {!isCollapsed && <span>設定</span>}
        </button>
      </div>

      <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="absolute top-20 -right-3.5 bg-white border-2 border-gray-300 text-gray-500 rounded-full p-1 hover:bg-gray-100 hover:border-primary-500 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronDoubleRightIcon className="h-4 w-4" /> : <ChevronDoubleLeftIcon className="h-4 w-4" />}
      </button>
    </aside>
  );
};

export default Sidebar;