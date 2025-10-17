import React, { useState, useMemo } from 'react';
import Card from './ui/Card';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { ProjectStatus } from '../types';
import { SearchIcon, MapIcon, XCircleIcon } from './icons';

const statusColors: { [key in ProjectStatus]: string } = {
  [ProjectStatus.Active]: 'bg-green-100 text-green-800',
  [ProjectStatus.Developing]: 'bg-orange-100 text-orange-800',
  [ProjectStatus.Validating]: 'bg-blue-100 text-blue-800',
  [ProjectStatus.Closed]: 'bg-gray-100 text-gray-800',
};

const ProjectDetailModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    const [activeTab, setActiveTab] = useState('總覽');
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto relative p-0">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10">
                    <XCircleIcon className="w-8 h-8"/>
                </button>

                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 p-8 border-r border-gray-200">
                        <img src={project.coverImage} alt={project.name} className="w-full h-48 object-cover rounded-lg" />
                        <h2 className="text-2xl font-bold text-gray-800 mt-6">{project.name}</h2>
                        <div className="mt-4 space-y-3 text-sm">
                            <p className="flex justify-between"><strong>狀態:</strong> <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[project.status]}`}>{project.status}</span></p>
                            <p className="flex justify-between"><strong>註冊ID:</strong> <span className="font-mono text-gray-600">{project.registryId}</span></p>
                            <p className="flex justify-between"><strong>方法學:</strong> <span className="text-gray-600">{project.methodology}</span></p>
                            <p className="flex justify-between"><strong>地點:</strong> <span className="text-gray-600">{project.location}</span></p>
                        </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-6 -mb-px">
                                {['總覽', '活動', '庫存', '文件', '報告', '照片'].map(tab => (
                                    <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === tab ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="mt-6">
                            {activeTab === '總覽' && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">專案描述</h4>
                                        <p className="text-gray-600 leading-relaxed">{project.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">減排週期</h4>
                                        <ul className="list-disc list-inside text-gray-600">
                                            {project.creditingPeriods.map(p => <li key={p}>{p}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg h-56 flex items-center justify-center text-gray-500">
                                        <MapIcon className="w-10 h-10 mr-2"/>
                                        專案地點地圖
                                    </div>
                                </div>
                            )}
                            {activeTab !== '總覽' && (
                                <div className="text-center py-20 text-gray-500">
                                    <h3 className="text-lg font-semibold">{activeTab}</h3>
                                    <p>此功能的內容將在此顯示。</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};


const ProjectManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = useMemo(() => {
        return PROJECTS.filter(project =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.registryId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-4 justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">專案管理</h1>
                <div className="flex items-center space-x-4">
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="搜尋專案..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        />
                    </div>
                    <button className="px-5 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md">
                        新增專案
                    </button>
                </div>
            </div>
            
            <Card className="!p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">專案名稱</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">註冊ID</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">地點</th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600">狀態</th>
                                <th scope="col" className="relative px-6 py-4"><span className="sr-only">查看</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="border-t border-gray-200">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-11 w-11">
                                                <img className="h-11 w-11 rounded-full object-cover" src={project.coverImage} alt={project.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{project.name}</div>
                                                <div className="text-sm text-gray-500">{project.methodology}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{project.registryId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[project.status]}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => setSelectedProject(project)} className="text-primary-600 hover:text-primary-800 font-semibold">查看詳情</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    );
};

export default ProjectManagement;