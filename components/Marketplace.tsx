import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MARKETPLACE_ITEMS } from '../constants';
import type { MarketplaceItem } from '../types';
import { ProductType, ProductCategory } from '../types';
import Card from './ui/Card';
import { FilterIcon, MapIcon, ListIcon, ExternalLinkIcon, CheckCircleIcon, XCircleIcon, CreditCardIcon } from './icons';

const FilterSidebar: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold flex items-center text-gray-800"><FilterIcon className="w-5 h-5 mr-2" /> 篩選器</h3>
      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">地點</label>
          <input type="text" placeholder="例如：亞洲、巴西" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">產品類型</label>
          <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
            <option>全部</option>
            {Object.values(ProductType).map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">類別</label>
          <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
            <option>全部</option>
            {Object.values(ProductCategory).map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button className="w-full bg-primary-600 text-white font-semibold py-2.5 rounded-lg hover:bg-primary-700 shadow-sm">套用篩選</button>
      </div>
    </Card>
  );
};

const ProductCard: React.FC<{ item: MarketplaceItem, onSelect: () => void }> = ({ item, onSelect }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 !p-0" onClick={onSelect}>
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-xl" />
      <div className="p-5">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs text-primary-600 font-semibold">{item.category}</p>
                <h4 className="font-bold text-gray-800 text-lg mt-1">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.location}</p>
            </div>
            <div className="text-right flex-shrink-0 pl-2">
                <p className="text-2xl font-bold text-gray-900">${item.pricePerTon.toFixed(2)}</p>
                <p className="text-xs text-gray-500">/tCO₂e</p>
            </div>
        </div>
      </div>
    </Card>
  );
};

const ProductDetailModal: React.FC<{ item: MarketplaceItem; onClose: () => void }> = ({ item, onClose }) => {
    const [quantity, setQuantity] = useState(item.minPurchase);
    const [purchaseStep, setPurchaseStep] = useState<'details' | 'confirm' | 'success'>('details');

    const totalPrice = quantity * item.pricePerTon;
    const isQuantityValid = quantity >= item.minPurchase && quantity <= item.availableStock;

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        setQuantity(isNaN(val) ? 0 : val);
    };

    const renderPurchasePanel = () => {
        switch (purchaseStep) {
            case 'success':
                return (
                    <div className="bg-gray-50 rounded-xl flex flex-col items-center justify-center text-center p-8 h-full">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800">購買成功！</h3>
                        <p className="text-gray-600 mt-2">
                            您已成功購買 {quantity.toLocaleString()} tCO₂e 的 {item.name}.
                        </p>
                        <p className="text-gray-600">總金額: <span className="font-semibold">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                        <button onClick={onClose} className="mt-8 w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 font-semibold">
                            完成
                        </button>
                    </div>
                );
            case 'confirm':
                return (
                    <div className="bg-gray-50 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">確認購買</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">項目:</span>
                                <span className="font-medium text-gray-800 text-right">{item.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">數量:</span>
                                <span className="font-medium text-gray-800">{quantity.toLocaleString()} tCO₂e</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">單價:</span>
                                <span className="font-medium text-gray-800">${item.pricePerTon.toFixed(2)} / tCO₂e</span>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between font-bold text-lg">
                            <span className="text-gray-700">總計:</span>
                            <span className="text-gray-900">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                         <div className="mt-8 space-y-3">
                            <button onClick={() => setPurchaseStep('success')} className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 font-semibold flex items-center justify-center">
                                <CreditCardIcon className="w-5 h-5 mr-2" /> 最終確認購買
                            </button>
                             <button onClick={() => setPurchaseStep('details')} className="w-full bg-transparent text-gray-600 py-2 rounded-lg hover:bg-gray-200 font-medium">
                                返回
                            </button>
                        </div>
                    </div>
                );
            case 'details':
            default:
                return (
                    <div className="bg-gray-50 rounded-xl p-8">
                        <p className="text-gray-500 text-sm">即時價格</p>
                        <p className="text-4xl font-bold text-gray-800">${item.pricePerTon.toFixed(2)}</p>
                        <div className="mt-6">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">數量 (tCO₂e)</label>
                            <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} min={item.minPurchase} max={item.availableStock} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                            <p className="text-xs text-gray-500 mt-1">最小購買量: {item.minPurchase} tCO₂e</p>
                            {!isQuantityValid && quantity > 0 && (
                                <p className="text-xs text-red-600 mt-1">
                                    {quantity < item.minPurchase ? `數量必須至少為 ${item.minPurchase}` : `數量不能超過可用庫存 ${item.availableStock.toLocaleString()}`}
                                </p>
                            )}
                        </div>
                         <div className="mt-4 text-lg font-semibold flex justify-between">
                            <span>總計</span>
                            <span>${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="mt-2 text-sm">
                            <p className="text-gray-600">可用庫存: <span className="font-semibold text-gray-800">{item.availableStock.toLocaleString()} tCO₂e</span></p>
                        </div>
                        <button 
                            onClick={() => setPurchaseStep('confirm')}
                            disabled={!isQuantityValid}
                            className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 font-semibold flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <CheckCircleIcon className="w-5 h-5 mr-2" /> 購買
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <Card className="w-full max-w-6xl max-h-[95vh] overflow-y-auto relative p-0">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10">
                    <XCircleIcon className="w-8 h-8"/>
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2 p-8">
                         {purchaseStep === 'details' ? (
                            <>
                                <img src={item.gallery[0]} alt={item.name} className="w-full h-72 object-cover rounded-lg mb-6"/>
                                <h2 className="text-3xl font-bold text-gray-800">{item.name}</h2>
                                <div className="flex space-x-2 mt-2">
                                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">{item.type}</span>
                                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{item.category}</span>
                                </div>
                                <div className="mt-8">
                                    <h4 className="font-semibold text-gray-700 mb-2">價格歷史 ($/tCO₂e)</h4>
                                     <div className="h-56 w-full">
                                        <ResponsiveContainer>
                                            <LineChart data={item.priceHistory} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
                                                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                                <YAxis tick={{ fontSize: 12 }} domain={['dataMin - 1', 'dataMax + 1']} />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                 <div className="mt-8">
                                    <h4 className="font-semibold text-gray-700 mb-2">文件</h4>
                                    <ul className="space-y-2">
                                        {item.documents.map(doc => (
                                            <li key={doc.name}>
                                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary-600 hover:underline">
                                                   <ExternalLinkIcon className="w-4 h-4 mr-2" /> {doc.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                         ) : (
                             <div className="flex items-center justify-center h-full">
                                <img src={item.image} alt={item.name} className="w-full h-auto max-h-[500px] object-contain rounded-lg"/>
                            </div>
                         )}
                    </div>
                    <div className="lg:col-span-1 p-8">
                        {renderPurchasePanel()}
                    </div>
                </div>
            </Card>
        </div>
    );
};


const Marketplace: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);

    return (
      <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">碳權市場</h1>
            <p className="text-gray-600 mt-1">搜尋、比較並購買碳權或 I-RECs。</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar onFilterChange={() => {}} />
          </div>
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">顯示 {MARKETPLACE_ITEMS.length} 個結果</p>
              <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-1">
                <button onClick={() => setViewMode('list')} className={`px-3 py-1 text-sm rounded-md ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}>
                  <ListIcon className="w-5 h-5" />
                </button>
                <button onClick={() => setViewMode('map')} className={`px-3 py-1 text-sm rounded-md ${viewMode === 'map' ? 'bg-white shadow' : 'text-gray-600'}`}>
                  <MapIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {viewMode === 'list' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {MARKETPLACE_ITEMS.map(item => (
                  <ProductCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
                ))}
              </div>
            ) : (
              <Card className="h-[600px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MapIcon className="w-24 h-24 mx-auto text-gray-400" />
                  <p className="mt-4 text-lg">互動式地圖檢視即將推出。</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {selectedItem && <ProductDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </div>
    );
};

export default Marketplace;