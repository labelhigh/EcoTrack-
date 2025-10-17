import React from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-white border-b border-gray-200">
        <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="搜尋專案、報告..."
                className="block w-full bg-gray-100 border border-transparent rounded-lg py-2.5 pl-10 pr-4 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
        </div>

        <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-gray-800 relative">
                <span className="sr-only">Notifications</span>
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center space-x-3">
                <img 
                  className="h-10 w-10 rounded-full object-cover" 
                  src="https://picsum.photos/seed/avatar/100/100" 
                  alt="User avatar" 
                />
                <div className="hidden md:flex items-center">
                    <span className="text-sm font-medium text-gray-800">Elena Petrova</span>
                    <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;