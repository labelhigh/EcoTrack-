import React, { useState, useMemo } from 'react';
import Card from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FlameIcon, BoltIcon, TruckIcon, TrashIcon, BuildingOfficeIcon, PlaneIcon } from './icons';

// Placeholder emission factors (in tCO2e per unit)
const EMISSION_FACTORS = {
    naturalGas: 0.002, // per m³
    gasoline: 0.0023, // per liter
    electricity: {
        'tw': 0.502, // Taiwan grid, per kWh
        'us': 0.400, // US grid average, per kWh
        'eu': 0.275, // EU grid average, per kWh
    },
    businessTravel: 0.00021, // per km (flight)
    waste: 0.5, // per tonne
    goods: 0.0001, // per dollar spent
};

const ScopeIcon: React.FC<{ scope: 'scope1' | 'scope2' | 'scope3', isActive?: boolean }> = ({ scope, isActive = false }) => {
    const baseClasses = "w-10 h-10 p-2 rounded-lg flex items-center justify-center transition-colors";
    const activeClasses = isActive ? 'text-white' : 'text-gray-600 bg-gray-100 group-hover:bg-gray-200';
    
    if (scope === 'scope1') return <div className={`${baseClasses} ${isActive ? 'bg-red-500' : ''} ${activeClasses}`}><FlameIcon /></div>;
    if (scope === 'scope2') return <div className={`${baseClasses} ${isActive ? 'bg-blue-500' : ''} ${activeClasses}`}><BoltIcon /></div>;
    return <div className={`${baseClasses} ${isActive ? 'bg-yellow-500' : ''} ${activeClasses}`}><TruckIcon /></div>;
};

const CarbonInventory: React.FC = () => {
    const [activeScope, setActiveScope] = useState<'scope1' | 'scope2' | 'scope3'>('scope1');
    
    // State for inputs
    const [scope1Data, setScope1Data] = useState({
        stationary: { naturalGas: 0 }, // in m³
        mobile: { gasoline: 0 } // in liters
    });
    const [scope2Data, setScope2Data] = useState({
        electricity: 0, // in kWh
        location: 'tw'
    });
    const [scope3Data, setScope3Data] = useState({
        purchasedGoods: 0, // in $
        waste: 0, // in tonnes
        businessTravel: 0 // in km
    });

    const handleInputChange = (scope: string, category: string, subcategory: string, value: string) => {
        const numericValue = parseFloat(value) || 0;
        if (scope === 'scope1') {
            setScope1Data(prev => ({ ...prev, [category]: { ...prev[category as keyof typeof prev], [subcategory]: numericValue } }));
        } else if (scope === 'scope2') {
            if (category === 'electricity') {
                 setScope2Data(prev => ({...prev, electricity: numericValue}));
            } else if (category === 'location') {
                 setScope2Data(prev => ({...prev, location: value}));
            }
        } else if (scope === 'scope3') {
            setScope3Data(prev => ({ ...prev, [category]: numericValue }));
        }
    };
    
    // Calculation logic
    const scope1Emissions = useMemo(() => {
        const stationary = scope1Data.stationary.naturalGas * EMISSION_FACTORS.naturalGas;
        const mobile = scope1Data.mobile.gasoline * EMISSION_FACTORS.gasoline;
        return stationary + mobile;
    }, [scope1Data]);

    const scope2Emissions = useMemo(() => {
        const gridFactor = EMISSION_FACTORS.electricity[scope2Data.location as keyof typeof EMISSION_FACTORS.electricity];
        return scope2Data.electricity * gridFactor;
    }, [scope2Data]);

    const scope3Emissions = useMemo(() => {
        const goods = scope3Data.purchasedGoods * EMISSION_FACTORS.goods;
        const waste = scope3Data.waste * EMISSION_FACTORS.waste;
        const travel = scope3Data.businessTravel * EMISSION_FACTORS.businessTravel;
        return goods + waste + travel;
    }, [scope3Data]);

    const totalEmissions = scope1Emissions + scope2Emissions + scope3Emissions;

    const summaryData = [
        { name: '範疇一', tCO2e: parseFloat(scope1Emissions.toFixed(2)), fill: '#ef4444' },
        { name: '範疇二', tCO2e: parseFloat(scope2Emissions.toFixed(2)), fill: '#3b82f6' },
        { name: '範疇三', tCO2e: parseFloat(scope3Emissions.toFixed(2)), fill: '#eab308' },
    ];
    
    const renderScopeContent = () => {
        switch (activeScope) {
            case 'scope1':
                return (
                    <Card>
                        <h3 className="font-semibold text-lg mb-4">範疇一：直接排放</h3>
                        <p className="text-sm text-gray-600 mb-6">來自公司擁有或控制的來源的直接排放，例如鍋爐、熔爐、車輛等燃燒燃料。</p>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-medium text-gray-800 flex items-center mb-2"><FlameIcon className="w-5 h-5 mr-2 text-red-500" /> 固定排放源</h4>
                                <label className="block text-sm font-medium text-gray-700">天然氣 (立方公尺)</label>
                                <input type="number" value={scope1Data.stationary.naturalGas} onChange={(e) => handleInputChange('scope1', 'stationary', 'naturalGas', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 flex items-center mb-2"><TruckIcon className="w-5 h-5 mr-2 text-red-500" /> 移動排放源</h4>
                                <label className="block text-sm font-medium text-gray-700">汽油 (公升)</label>
                                <input type="number" value={scope1Data.mobile.gasoline} onChange={(e) => handleInputChange('scope1', 'mobile', 'gasoline', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                        </div>
                    </Card>
                );
            case 'scope2':
                return (
                     <Card>
                        <h3 className="font-semibold text-lg mb-4">範疇二：能源間接排放</h3>
                        <p className="text-sm text-gray-600 mb-6">來自購買的電力、蒸汽、熱力或冷卻的間接排放。</p>
                         <div className="space-y-6">
                            <div>
                                <h4 className="font-medium text-gray-800 flex items-center mb-2"><BoltIcon className="w-5 h-5 mr-2 text-blue-500" /> 購入電力</h4>
                                <label className="block text-sm font-medium text-gray-700">電力消耗 (kWh)</label>
                                <input type="number" value={scope2Data.electricity} onChange={(e) => handleInputChange('scope2', 'electricity', '', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                                <label className="block text-sm font-medium text-gray-700 mt-4">地區 (電網係數)</label>
                                <select value={scope2Data.location} onChange={(e) => handleInputChange('scope2', 'location', '', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500">
                                    <option value="tw">台灣</option>
                                    <option value="us">美國</option>
                                    <option value="eu">歐盟</option>
                                </select>
                            </div>
                        </div>
                    </Card>
                );
            case 'scope3':
                return (
                    <Card>
                        <h3 className="font-semibold text-lg mb-4">範疇三：其他間接排放</h3>
                        <p className="text-sm text-gray-600 mb-6">發生在公司價值鏈中的所有間接排放，包括上游和下游排放。</p>
                        <div className="space-y-6">
                             <div>
                                <h4 className="font-medium text-gray-800 flex items-center mb-2"><BuildingOfficeIcon className="w-5 h-5 mr-2 text-yellow-500" /> 購買的商品與服務</h4>
                                <label className="block text-sm font-medium text-gray-700">支出金額 (USD)</label>
                                <input type="number" value={scope3Data.purchasedGoods} onChange={(e) => handleInputChange('scope3', 'purchasedGoods', '', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 flex items-center mb-2"><TrashIcon className="w-5 h-5 mr-2 text-yellow-500" /> 營運產生的廢棄物</h4>
                                <label className="block text-sm font-medium text-gray-700">廢棄物 (公噸)</label>
                                <input type="number" value={scope3Data.waste} onChange={(e) => handleInputChange('scope3', 'waste', '', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 flex items-center mb-2"><PlaneIcon className="w-5 h-5 mr-2 text-yellow-500" /> 商務旅行</h4>
                                <label className="block text-sm font-medium text-gray-700">航空里程 (公里)</label>
                                <input type="number" value={scope3Data.businessTravel} onChange={(e) => handleInputChange('scope3', 'businessTravel', '', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                        </div>
                    </Card>
                );
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-4 justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">碳盤查計算機</h1>
                 <div className="flex items-center space-x-4">
                     <select className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary-500">
                         <option>GHG Protocol</option>
                         <option>ISO 14064-1</option>
                     </select>
                    <button className="px-5 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md">
                        匯出報告
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                     <div className="grid grid-cols-3 gap-4">
                        {([
                            {id: 'scope1', name: '範疇一'}, 
                            {id: 'scope2', name: '範疇二'}, 
                            {id: 'scope3', name: '範疇三'}
                        ] as const).map(tab => (
                             <button
                                key={tab.id}
                                onClick={() => setActiveScope(tab.id)}
                                className={`group p-4 rounded-xl flex items-center transition-colors ${
                                    activeScope === tab.id
                                    ? 'bg-white shadow-md border border-gray-200'
                                    : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                            <ScopeIcon scope={tab.id} isActive={activeScope === tab.id} />
                            <span className={`ml-4 font-semibold text-lg ${activeScope === tab.id ? 'text-gray-800' : 'text-gray-600'}`}>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                    {renderScopeContent()}
                </div>

                <div className="lg:col-span-1">
                    <Card className="h-full">
                        <h3 className="font-semibold text-lg mb-4">排放總覽</h3>
                        <div className="text-center my-6">
                            <p className="text-gray-600 text-sm">總碳排放量 (tCO₂e)</p>
                            <p className="text-5xl font-bold text-gray-800 tracking-tight">{totalEmissions.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer>
                                <BarChart data={summaryData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 14, fill: '#4b5563' }} width={60} />
                                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} formatter={(value: number) => [value.toFixed(2), 'tCO₂e']} />
                                    <Bar dataKey="tCO2e" barSize={30} radius={[0, 5, 5, 0]}>
                                        {summaryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CarbonInventory;