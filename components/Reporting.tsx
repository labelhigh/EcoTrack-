import React, { useState, useRef, useEffect } from 'react';
import { REPORTS } from '../constants';
import type { Report } from '../types';
import { ReportStatus } from '../types';
import Card from './ui/Card';
import CreateReportWizard from './CreateReportWizard';

const statusColors: { [key in ReportStatus]: string } = {
  [ReportStatus.Approved]: 'bg-green-100 text-green-800',
  [ReportStatus.InReview]: 'bg-blue-100 text-blue-800',
  [ReportStatus.Draft]: 'bg-gray-100 text-gray-800',
};

const ReportList: React.FC<{ onStartCreate: () => void }> = ({ onStartCreate }) => {
    const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());
    const selectAllRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = selectedReports.size > 0 && selectedReports.size < REPORTS.length;
        }
    }, [selectedReports]);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelectedReports = new Set(REPORTS.map(r => r.id));
            setSelectedReports(newSelectedReports);
        } else {
            setSelectedReports(new Set());
        }
    };

    const handleSelectOne = (id: string) => {
        const newSelectedReports = new Set(selectedReports);
        if (newSelectedReports.has(id)) {
            newSelectedReports.delete(id);
        } else {
            newSelectedReports.add(id);
        }
        setSelectedReports(newSelectedReports);
    };

    const hasSelected = selectedReports.size > 0;

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-4 justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">報告中心</h1>
                <button 
                    onClick={onStartCreate}
                    className="px-5 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md"
                >
                    建立新報告
                </button>
            </div>

            <Card className="!p-0 overflow-hidden">
                <div className={`p-4 bg-gray-50 border-b border-gray-200 transition-all duration-300 ${hasSelected ? 'block' : 'hidden'}`}>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700">{selectedReports.size} 已選擇</span>
                        <button className="text-sm text-red-600 hover:text-red-800 font-medium">刪除</button>
                        <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">匯出</button>
                    </div>
                </div>
                 <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="p-4">
                                    <input
                                        ref={selectAllRef}
                                        type="checkbox"
                                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                        onChange={handleSelectAll}
                                        checked={REPORTS.length > 0 && selectedReports.size === REPORTS.length}
                                    />
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">報告名稱</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">類型</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">狀態</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">關聯專案</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">最後修改</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {REPORTS.map((report) => (
                                <tr key={report.id} className={`border-t border-gray-200 ${selectedReports.has(report.id) ? 'bg-primary-50' : 'hover:bg-gray-50'}`}>
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                            checked={selectedReports.has(report.id)}
                                            onChange={() => handleSelectOne(report.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[report.status]}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.associatedProject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.lastModified}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}


const Reporting: React.FC = () => {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return <CreateReportWizard onCancel={() => setIsCreating(false)} />;
    }

    return <ReportList onStartCreate={() => setIsCreating(true)} />;
};

export default Reporting;