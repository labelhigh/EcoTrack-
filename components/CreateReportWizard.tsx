import React, { useState } from 'react';
import Card from './ui/Card';
import { PROJECTS } from '../constants';
import { ChevronLeftIcon, FileTextIcon, BarChartIcon, FolderIcon, CheckCircleIcon } from './icons';

type ReportType = '排放數據' | 'ESG 揭露' | '專案報告';

const reportTypes: { id: ReportType, title: string; description: string; icon: React.FC<any> }[] = [
    { id: '排放數據', title: '排放數據報告', description: '用於溫室氣體盤查的詳細數據報告。', icon: BarChartIcon },
    { id: 'ESG 揭露', title: 'ESG 揭露報告', description: '符合 GRI、SASB 等標準的永續報告。', icon: FileTextIcon },
    { id: '專案報告', title: '專案減排報告', description: '針對特定碳權專案的績效與驗證報告。', icon: FolderIcon },
];

const WizardStepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = ['選擇類型', '設定詳情', '檢視與建立'];
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, stepIdx) => (
                    <li key={step} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                        {stepIdx < currentStep ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-primary-600" />
                                </div>
                                <div className="relative flex h-8 w-8 items-center justify-center bg-primary-600 rounded-full">
                                    <CheckCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                </div>
                            </>
                        ) : stepIdx === currentStep ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <div className="relative flex h-8 w-8 items-center justify-center bg-white border-2 border-primary-600 rounded-full" aria-current="step">
                                    <span className="h-2.5 w-2.5 bg-primary-600 rounded-full" aria-hidden="true" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <div className="relative flex h-8 w-8 items-center justify-center bg-white border-2 border-gray-300 rounded-full" />
                            </>
                        )}
                         <div className="absolute top-10 w-max text-center">
                            <span className={`text-sm font-medium ${stepIdx <= currentStep ? 'text-primary-600' : 'text-gray-500'}`}>{step}</span>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

const CreateReportWizard: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
    const [step, setStep] = useState(0);
    const [reportData, setReportData] = useState({
        type: null as ReportType | null,
        name: '',
        description: '',
        associatedProject: '',
        startDate: '',
        endDate: '',
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleDataChange = (field: keyof typeof reportData, value: string) => {
        setReportData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleCreateReport = () => {
        console.log('Creating report with data:', reportData);
        // Here you would typically call an API to save the report
        onCancel(); // For now, just close the wizard
    }

    const renderStepContent = () => {
        switch (step) {
            case 0: // Select Type
                return (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">選擇報告類型</h2>
                        <p className="text-gray-600 mt-1">選擇您想要建立的報告類型。</p>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {reportTypes.map(type => {
                                const Icon = type.icon;
                                const isSelected = reportData.type === type.id;
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => handleDataChange('type', type.id)}
                                        className={`p-6 border rounded-lg text-left transition-all duration-200 ${isSelected ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500' : 'bg-white hover:border-gray-400'}`}
                                    >
                                        <Icon className="w-8 h-8 mb-3 text-primary-600" />
                                        <h3 className="font-semibold text-gray-800">{type.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            case 1: // Configure Details
                return (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">設定報告詳情</h2>
                        <p className="text-gray-600 mt-1">填寫報告的基本資訊。</p>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="report-name" className="block text-sm font-medium text-gray-700">報告名稱</label>
                                <input type="text" id="report-name" value={reportData.name} onChange={e => handleDataChange('name', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div>
                                <label htmlFor="report-description" className="block text-sm font-medium text-gray-700">描述 (選填)</label>
                                <textarea id="report-description" rows={3} value={reportData.description} onChange={e => handleDataChange('description', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"></textarea>
                            </div>
                             {reportData.type === '專案報告' && (
                                <div>
                                    <label htmlFor="associated-project" className="block text-sm font-medium text-gray-700">關聯專案</label>
                                    <select id="associated-project" value={reportData.associatedProject} onChange={e => handleDataChange('associatedProject', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500">
                                        <option value="">選擇一個專案</option>
                                        {PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                            )}
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">報告期間 (起)</label>
                                    <input type="date" id="start-date" value={reportData.startDate} onChange={e => handleDataChange('startDate', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">報告期間 (迄)</label>
                                    <input type="date" id="end-date" value={reportData.endDate} onChange={e => handleDataChange('endDate', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 2: // Review & Create
                return (
                     <div>
                        <h2 className="text-xl font-bold text-gray-800">檢視與建立</h2>
                        <p className="text-gray-600 mt-1">請確認以下資訊是否正確。</p>
                        <Card className="mt-6 !p-0">
                           <dl className="divide-y divide-gray-200">
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">報告類型</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{reportData.type}</dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">報告名稱</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{reportData.name || '未填寫'}</dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">報告期間</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{reportData.startDate || 'N/A'} 至 {reportData.endDate || 'N/A'}</dd>
                                </div>
                                {reportData.type === '專案報告' && (
                                    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">關聯專案</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{PROJECTS.find(p => p.id === reportData.associatedProject)?.name || '未選擇'}</dd>
                                    </div>
                                )}
                           </dl>
                        </Card>
                    </div>
                );
            default:
                return null;
        }
    };
    
    const isNextDisabled = () => {
        if (step === 0 && !reportData.type) return true;
        if (step === 1 && (!reportData.name || !reportData.startDate || !reportData.endDate)) return true;
        return false;
    }

    return (
        <div className="space-y-8">
            <button onClick={onCancel} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                返回報告列表
            </button>
            <Card className="max-w-4xl mx-auto">
                <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
                     <WizardStepper currentStep={step} />
                </div>
                
                <div className="px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200 min-h-[300px]">
                    {renderStepContent()}
                </div>

                <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center rounded-b-xl">
                    <div>
                        {step > 0 && (
                            <button onClick={handleBack} className="px-5 py-2 bg-white text-gray-700 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                                上一步
                            </button>
                        )}
                    </div>
                    <div>
                        {step < 2 ? (
                             <button onClick={handleNext} disabled={isNextDisabled()} className="px-5 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed">
                                下一步
                            </button>
                        ) : (
                             <button onClick={handleCreateReport} className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                                建立報告
                            </button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CreateReportWizard;
